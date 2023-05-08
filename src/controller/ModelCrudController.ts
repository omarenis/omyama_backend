import { Request, Response } from 'express';
import { ObjectType } from '../data-source';
import {User, UserModel} from "../entity/User";
import {IModelCrudService} from "../services/interfaces/IModelCrud";


/*
export class RestModelController<T> implements IRestController<T>
{
    private service: IModelCrudService<T>;

    constructor(type)
    {
        this.service = new ModelCrudService<T>(type);
    }

    async list(request: Request, response: Response, next: Function): Promise<T[]> {
        return await this.service.findAll();
    }
    async retrieve(request: Request, response: Response, next: Function): Promise<T> {
        return await this.service.findById(request.params.id);
    }
    async create(request: Request, response: Response, next: Function): Promise<T> {
        return await this.service.create(request.body);
    }
    async delete(request: Request, response: Response, next: Function): Promise<void> {
        await this.service.delete(request.params.id);
    }
    update(request: Request, response: Response, next: Function): Promise<T> {
        throw new Error('Method not implemented.');
    }
}
*/

/*

export class ModelTemplate<T> implements ITemplateController<T>
{
    private service: IModelCrud<T>;
    private readonly template: string;
    private readonly urlRedirect: string;
    constructor(template: string, type, urlRedirect: string)
    {
        this.template = template;
        this.service = new ModelCrudService<T>(type);
        this.urlRedirect = urlRedirect;
    }
    get(request: Request, response: Response, next: Function) {
        response.render(this.template, {instances: this.service.findAll()});
    }
    post(request: Request, response: Response, next: Function) {
        try {
            this.service.create(request.body);
            response.redirect(this.urlRedirect);
        }
        catch {
            request.flash("error",);
            response.redirect("")
        }
            response.json({message: {type: 'error', content: ''}})

    }
}


export class LoginTemplate
{
    async get(request: Request, response: Response, next: Function)
    {
        response.render('public/interfaces/login.njk');
    }

    async post(request: Request, response: Response, next: Function)
    {

    }
}

export class SignupTemplate
{
    private service: ModelCrudService<UserModel, User>

    constructor()
    {
        this.service = new ModelCrudService<UserModel, User>(User);
    }

    async get(request: Request, response: Response, next: Function)
    {
        response.render('public/interfaces/signup.njk')
    }
}
*/
