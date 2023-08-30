import {Request, Response} from 'express';
import {ObjectType} from '../../data-source';
import {IModelCrudService} from "../../services/interfaces/IModelCrud";
import {ModelCrudServiceImplementation} from "../../services/implementations/ModelCrudService";
import {IRestController} from "./IRestController";
import {ITemplateController} from "./ITemplateController";
import { ObjectLiteral } from 'typeorm';


export class RestModelController<T, P> implements IRestController<P> {
    private service: IModelCrudService<P>;

    constructor(type) {
        this.service = new ModelCrudServiceImplementation<T, P>(type);
    }

    async list(request: Request, response: Response): Promise<P[]> {
        return await this.service.findAll();
    }

    async retrieve(request: Request, response: Response): Promise<P> {
        return await this.service.findById(Number(request.params.id));
    }

    async create(request: Request, response: Response): Promise<P> {
        return await this.service.create(request.body);
    }

    async delete(request: Request, response: Response): Promise<void> {
        await this.service.delete(Number(request.params.id));
    }

    update(request: any, response: Response): Promise<P> {
        return this.service.update((request.body as ObjectType<P>), request.params.id)
    }

    findAll(request, response): Promise<P[]> {
        return Promise.resolve([]);
    }
}


export class ModelTemplate<T, P> implements ITemplateController<P> {
    protected service: ModelCrudServiceImplementation<T, P>;
    protected readonly template: string;
    protected readonly urlRedirect: string;
    protected readonly modelConfig: {[key: string]: {type: string, required: boolean, classMap ?: ObjectLiteral, fieldToSlugify ?: string}}
    constructor(template: string, type, urlRedirect: string) {
        this.template = template;
        this.service = new ModelCrudServiceImplementation<T, P>(type);
        this.urlRedirect = urlRedirect;
    }

    async get(request: Request, response: Response,) {
        response.render(this.template, {instances: this.service.findAll()});
    }

    async post(request: e.Request, response: e.Response): Promise<Response> {
        try {
            if(this.modelConfig !== undefined)
            {

            }
            await this.service.create(request.body);
            return response.redirect(this.urlRedirect);
        } catch {
            request.flash("error",);
            response.redirect("")
        }
        return response.render(this.template);
    }
}
