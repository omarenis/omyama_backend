import { Request, Response } from 'express';
import { ObjectType } from '../../data-source';
import {IModelCrudService} from "../../services/interfaces/IModelCrud";
import {ModelCrudServiceImplementation} from "../../services/implementations/ModelCrudService";
import {IRestController} from "./IRestController";
import {ITemplateController} from "./ITemplateController";
import {EntityTarget, ObjectLiteral} from "typeorm";


export class RestModelController<T, P> implements IRestController<P>
{
    private service: IModelCrudService<P>;

    constructor(type)
    {
        this.service = new ModelCrudServiceImplementation<T, P>(type);
    }

    async list(request: Request, response: Response): Promise<P[]> {
        return await this.service.findAll();
    }
    async retrieve(request: Request, response: Response): Promise<P> {
        return await this.service.findById(request.params.id);
    }
    async create(request: Request, response: Response): Promise<P> {
        return await this.service.create(request.body);
    }
    async delete(request: Request, response: Response): Promise<void> {
        await this.service.delete(request.params.id);
    }
    update(request: Request, response: Response): Promise<P> {
        return this.service.update((request.body as ObjectType<P>), request.params.id)
    }

    findAll(request, response): Promise<P[]> {
        return Promise.resolve([]);
    }
}


export class ModelTemplate<T, P> implements ITemplateController<P>
{
    protected service: ModelCrudServiceImplementation<T, P>;
    protected readonly template: string;
    protected readonly urlRedirect: string;
    constructor(template: string, type, urlRedirect: string)
    {
        this.template = template;
        this.service = new ModelCrudServiceImplementation<T, P>(type);
        this.urlRedirect = urlRedirect;
    }
    async get(request: Request, response: Response,) {
        console.log(request.session);
        response.render(this.template, {instances: this.service.findAll()});
    }
    async post(request: Request, response: Response) {
        try {
           await this.service.create(request.body);
            response.redirect(this.urlRedirect);
        }
        catch {
            request.flash("error",);
            response.redirect("")
        }
            response.json({message: {type: 'error', content: ''}})
    }
}
