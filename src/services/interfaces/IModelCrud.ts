export interface IModelCrudService<T, P>
{
    findAll(): Promise<P[]>;
    create(instance: P): Promise<P>;
    delete(id: number): Promise<void>;
    findById(id: number): Promise<P>;
    findOneBy(params: {[key: string]: any}): Promise<P>;
    findBy(params ?: object): Promise<P[]>;
    loadData(instanceModel: T): P;
    put(instance: Partial<P>, id: number): Promise<P>
}
