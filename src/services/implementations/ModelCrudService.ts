import {ObjectType, AppDataSource} from "../../data-source";
import {EntityNotFoundError, EntityTarget, ObjectLiteral} from "typeorm";
import {IModelCrudService} from "../interfaces/IModelCrud";
import {IModelRepository} from "../../repositories/interfaces/IModelRepository";
import {IModelRepositoryImplementation} from "../../repositories/implementations/IModelRepositoryImplementation";

export class ModelCrudServiceImplementation<T extends EntityTarget<P>, P> implements IModelCrudService<P>
{
    private repository: IModelRepository<T, P>;
    private readonly type: ObjectType<T>;
    constructor(type) {
        this.type = type;
        this.repository = new IModelRepositoryImplementation<T, P>(type.type);
    }
    create(instance: P): Promise<P> {
        return this.repository.create(instance);
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
        return ;
    }

    findAll(): Promise<P[]> {
        return this.repository.list(undefined);
    }

    update(instance: ObjectType<P>, id: number): Promise<P> {
        return this.repository.update(instance, id);
    }

    async findById(id: number): Promise<P> {
        const instance =  await this.repository.retrieve(id);
        if(instance === null)
        {
            throw  new EntityNotFoundError(this.type, `object of type${this.type.name} not found with id ${id}`);
        }
        return instance;
    }
}
