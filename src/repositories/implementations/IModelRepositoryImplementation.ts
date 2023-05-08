import {AppDataSource, ObjectType} from "../../data-source";
import {IModelRepository} from "../interfaces/IModelRepository";
import {DeepPartial, EntityTarget, ObjectLiteral, Repository} from "typeorm";
export class IModelRepositoryImplementation<T extends EntityTarget<ObjectLiteral>, P> implements IModelRepository<T, P> {
    private _modelRepository: Repository<ObjectLiteral>;
    constructor(type: T) {
        this._modelRepository = AppDataSource.getRepository(type);
    }
    list(params: ObjectType<P> | undefined): Promise<P[]> {
        return ((params !== undefined ? this._modelRepository.findBy(params) : this._modelRepository.find()) as Promise<P[]>)
    }
    create(object: P): Promise<P> {
        return (this._modelRepository.save(object) as Promise<P>);
    }
    retrieve(id: number): Promise<P> {
        return (this._modelRepository.findOneBy({id }) as Promise<P>);
    }
    async delete(id: number) {
       const objectPromise = await this.retrieve(id);
       if(objectPromise !== null)
       {
           await this._modelRepository.delete(objectPromise);
       }
    }

    async update(object: ObjectType<P>, id: number): Promise<P> {
        const modelObject: ObjectLiteral =  await this._modelRepository.findOneBy({id});
        Object.keys(object).forEach((key) => {
            modelObject[key] = object[key];
        });
        return (await this._modelRepository.save(modelObject) as Promise<P>);
    }
}
