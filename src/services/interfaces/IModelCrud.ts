import {ObjectType} from "typeorm";

export interface IModelCrudService<T>
{
    findAll(): Promise<T[]>;

    create(instance: T): Promise<T>;

    update(person: ObjectType<T>, id: number): Promise<T>;

    delete(id: number): Promise<void>;
    findById(id: number): Promise<T>;
}
