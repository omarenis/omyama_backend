import {ObjectType} from "typeorm";

export interface IModelCrudService<P>
{
    findAll(): Promise<P[]>;
    create(instance: P): Promise<P>;
    update(person: ObjectType<P>, id: number): Promise<P>;
    delete(id: number): Promise<void>;
    findById(id: number): Promise<P>;
    getBy(params: {[key: string]: string}): Promise<P>;
}
