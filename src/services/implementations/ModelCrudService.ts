import {ObjectType, AppDataSource} from "../../data-source";
import {EntityNotFoundError} from "typeorm";
import {IModelCrudService} from "../interfaces/IModelCrud";

export class ModelCrudServiceImplementation<T, P> implements IModelCrudService<P> {
    protected readonly repository;
    private readonly type: ObjectType<T>;
    private readonly model: any;

    constructor(Model) {
        this.model = Model;
        this.repository = AppDataSource.getRepository(Model);
    }

    list() {
        return this.repository.find();
    }

    loadData(instanceModel: T): P {
        const instance: P = ({} as P);
        Object.keys(instanceModel).forEach((key) => {
            instance[key] = instanceModel[key];
        });
        return instance;
    }

    convertDataIntoModelInstance(instance: P): T {
        const modelInstance = ({} as T);
        Object.keys(instance).forEach((key) => {
            modelInstance[key] = instance[key];
        });
        console.log(modelInstance);
        return modelInstance;
    }
    create(instance: P): Promise<P> {
        const modelInstance = this.convertDataIntoModelInstance(instance);
        return this.repository.save(modelInstance);
    }

    async delete(id: number): Promise<void> {
        const _object = this.repository.findOneBy({id});
        if(_object !== null)
        {
            this.repository.delete(_object);
        }
        else
        {
            throw new EntityNotFoundError(this.model, `${this.model.name.toLowerCase()} not found`);
        }
        await this.repository.delete(id);
    }

    async findAll(): Promise<P[]> {
        const model_instances: T[] = await this.repository.find();
        console.log(model_instances);
        return [].concat(
            model_instances.map((model_instance) => {
                return this.loadData(model_instance);
            })
        );
    }

    getBy(params: {[key: string]: string}) {
        return this.repository.findOneBy(params);
    }

    update(instance: ObjectType<P>, id: number): Promise<P> {
        return this.repository.update(instance, id);
    }

    async findById(id: number): Promise<P> {
        const instance = await this.repository.findOneBy({id});
        if (instance === null) {
            throw  new EntityNotFoundError(this.type, `object of type${this.type.name} not found with id ${id}`);
        }
        return instance;
    }
}
