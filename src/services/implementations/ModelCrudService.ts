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

    constructor(Model, modelConfig ?: { [key: string]: any }) {
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
        const modelInstance: T = ({} as T);
        Object.keys(instance).forEach((key: string): void => {
            modelInstance[key] = instance[key];
        });
        if (this.modelConfig?.slug !== undefined) {
            modelInstance['slug'] = slugify(modelInstance[this.modelConfig?.slug.fieldToSlug]);
        }
        return modelInstance;
    }

    async create(instance: P): Promise<P> {
        for (const key of Object.keys(instance)) {
            if (this.modelConfig[key]?.unique) {
                let data = await this.repository.findOneBy({
                    [key]: instance[key]
                });
                if (data) {
                    throw new Error('instance must not exist0');
                }
            }
            if(this.modelConfig[key].type === 'blob')
            {
                saveFile(instance[key]).then((response) => {

                });
            }
        }
        const modelInstance = this.convertDataIntoModelInstance(instance);
        return (await this.repository.save(modelInstance) as unknown as P);
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
