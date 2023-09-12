import {ObjectType, AppDataSource} from "../../data-source";
import {EntityNotFoundError, ObjectLiteral, Repository} from "typeorm";
import {IModelCrudService} from "../interfaces/IModelCrud";
import slugify from "slugify";
import {saveFile} from "../../../appConfig";

export class ModelCrudServiceImplementation<T, P> implements IModelCrudService<P> {
    protected readonly repository: Repository<ObjectLiteral>;
    private readonly type: ObjectType<T>;
    private readonly model: any;
    private readonly modelConfig ?: { [key: string]: any };

    constructor(Model: Function, modelConfig ?: { [key: string]: any }) {
        this.model = Model;
        this.modelConfig = modelConfig;
        this.repository = AppDataSource.getRepository(Model);
    }

    public async findBy(params) {
        return await this.repository.findBy(params);
    };

    list() {
        return this.repository.find();
    }

    loadData(instanceModel: T): P {
        const instance: P = ({} as P);
        Object.keys(instanceModel).forEach((key: string): void => {
            instance[key] = instanceModel[key];
        });
        return instance;
    }

    convertDataIntoModelInstance(instance: P): T {
        let field = null;
        Object.keys(this.modelConfig).forEach(async (key: string): Promise<void> => {
            if (this.modelConfig[key].required && !instance[key]) {
                throw new Error(`${key} is required `)
            }
            if (this.modelConfig[key].type.indexOf('_')> -1 && !isNaN(instance[key])) {
                if (!this.modelConfig[key].classMap) {
                    throw new Error(`class Map not specified for the field ${key}`)
                }
                field = AppDataSource.getRepository(this.modelConfig[key].classMap).findOneBy({id: instance[key]})
                if (!field) {
                    throw new Error(`${field.constructor.name.toLowerCase()} does not exist with the specified id ${instance[key]}`)
                }
                instance[key] = field;
            }
            if (this.modelConfig[key].type === 'blob') {
                if(await saveFile(instance[key]))
                {
                    instance[key] = `/uploads/${instance[key].name}`;
                }
                }
        });
        if (this.modelConfig?.slug !== undefined) {
            instance['slug'] = slugify(instance[this.modelConfig?.slug.fieldToSlug]);
        }
        return (instance as unknown as T);
    }

    async create(instance: P): Promise<P> {
        try {
            const modelInstance = this.convertDataIntoModelInstance(instance);

        return (modelInstance as unknown as P);
        } catch (err)
        {

        }
    }

    async put(instance: P, id: number): Promise<P> {
        const instance_model = this.repository.findOneBy({id: id});
        if (instance_model === null) {
            throw EvalError('instance not found');
        }
        Object.keys(instance_model).forEach((key) => {
            if (instance[key] !== instance_model[key] && this.modelConfig[key].type !== 'blob') {
                instance_model[key] = instance[key];
            } else if (instance[key] !== null) {
                saveFile(instance[key]).then((response) => {
                    instance_model[key] = `/uploads/${instance[key].name}`;
                });
            }
        });
        return (await this.repository.save(instance_model) as unknown as P);
    }

    async delete(id: number): Promise<void> {
        const _object = this.repository.findOneBy({id});
        if (_object !== null) {
            await this.repository.delete(_object);
        } else {
            throw new EntityNotFoundError(this.model, `${this.model.name.toLowerCase()} not found`);
        }
        await this.repository.delete(id);
    }

    async findAll(): Promise<P[]> {
        const model_instances: T[] = (await this.repository.find() as T[]);
        console.log(model_instances);
        return [].concat(
            model_instances.map((model_instance) => {
                return this.loadData(model_instance);
            })
        );
    }

    getBy(params: { [key: string]: string }) {
        return (this.repository.findOneBy(params) as Promise<P>);
    }

    async update(instance: ObjectType<P>, id: number): Promise<P> {
        return (await this.repository.update(instance, id) as unknown as P);
    }

    async findById(id: number): Promise<P> {
        const instance = await this.repository.findOneBy({id});
        if (instance === null) {
            throw new EntityNotFoundError(this.type, `object of type${this.type.name} not found with id ${id}`);
        }
        return (instance as unknown as P);
    }

    async findOneBy(param: object) {
        return await this.repository.findOneBy(param);
    }
}
