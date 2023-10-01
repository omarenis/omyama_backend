import {EntityNotFoundError, ObjectLiteral, Repository} from "typeorm";
import {IModelCrudService} from "../interfaces/IModelCrud";
import slugify from "slugify";
import { saveFile } from "../../../appConfig";

export function ModelCrudServiceImplementation<T, P>(repository: Repository<ObjectLiteral>, modelConfig ?: { [key: string]: any }): IModelCrudService<T, P> {
    const _repository: Repository<ObjectLiteral> = repository;
    const _modelConfig: { [key: string]: any } = modelConfig;
    function convertDataIntoModelInstance(instance: P): T {
        Object.keys(_modelConfig).forEach((key: string): void => {
            if (modelConfig[key].required && !instance[key]) {
                throw new Error(`${key} is required `)
            }
            if (modelConfig[key].type === 'blob') {
                saveFile(instance[key]).then(() => {
                    instance[key] = `/uploads/${instance[key].name}`;
                });
            }
        });
        if (modelConfig?.slug !== undefined) {
            instance['slug'] = slugify(instance[_modelConfig?.slug.fieldToSlug]);
        }
        return (instance as unknown as T);
    }

    return {
        create: async (instance: P): Promise<P> => {
            try {
                const modelInstance: T = await repository.save( convertDataIntoModelInstance(instance));
                return (modelInstance as unknown as P);
            } catch (err) {
                console.log(err);
            }
        },
        findAll: async (): Promise<P[]> => (await _repository.find() as P[]),
        delete: async (id: number) => {
            const _object = _repository.findOneBy({id});
            if (_object !== null
            ) {
                await this.repository.delete(_object);
            } else {
                throw new EntityNotFoundError(_repository.target, `${this.repository.target} not found`);
            }
            await _repository.delete(id);
        },
        findById: async (id: number) => {
            const instance = await this.repository.findOneBy({id});
            if (instance === null) {
                throw new EntityNotFoundError(this.type, `object of type${this.type.name} not found with id ${id}`);
            }
            return (instance as unknown as P);
        },
        findOneBy: async (param: object): Promise<P> => (await _repository.findOneBy(param) as P),
        loadData: (instanceModel: T): P => {
            const instance: P = ({} as P);
            Object.keys(instanceModel).forEach((key: string): void => {
                instance[key] = instanceModel[key];
            });
            return instance;
        },
        put:
            async (instance: P, id: number): Promise<P> => {
                const instance_model = _repository.findOneBy({id: id});
                console.log(_repository.target);
                if (instance_model === null) {
                    throw EvalError('instance not found');
                }
                Object.keys(instance_model).forEach((key) => {
                    if (instance[key] !== instance_model[key] && this.modelConfig[key].type !== 'blob') {
                        instance_model[key] = instance[key];
                    } else if (instance[key] !== null) {
                        saveFile(instance[key]).then(() => {
                            instance_model[key] = `/uploads/${instance[key].name}`;
                        });
                    }
                });
                return (await this.repository.save(instance_model) as unknown as P);
            },
        findBy:async  (params?: object): Promise<P[]> => {
            return (await _repository.findBy(params) as P[])
        }
    }
}
