import {ObjectType} from "../../data-source";
import {Entity} from 'typeorm';
export interface IModelRepository<T, P> {
    list(params: ObjectType<P>): Promise<P[]>;
    create(object: P): Promise<P>;
    update(object: ObjectType<P>, id: number): Promise<P>;
    delete(id: number): Promise<void>;
    retrieve(id: number): Promise<P>;
}
