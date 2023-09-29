import {ObjectLiteral, Repository} from "typeorm";

export interface IModelCrudService<T, P>
{
    repository: Repository<ObjectLiteral>
    findAll(): Promise<P[]>;
    create(instance: P): Promise<P>;
    delete(id: number): Promise<void>;
    findById(id: number): Promise<P>;
    findOneBy(params: {[key: string]: string}): Promise<P>;
    findBy(params ?: object): Promise<P[]>;
    loadData(instanceModel: T): P;
    put(instance: P, id: number): Promise<P>
}
