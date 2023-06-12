import {Request, Response} from "express";
import {ModelCrudServiceImplementation} from "../../services/implementations/ModelCrudService";

export interface IFormView<T, P> {

    post(request: Request, response: Response): Promise<void>;
    get(request: Request, response: Response): Promise<void>
}


export class FormViewImplementation<T, P> implements IFormView<T, P> {
    private _service: ModelCrudServiceImplementation<T, P>;
    private readonly _template: string;
    private readonly _redirectUrl: string;

    constructor(Model, template, redirectUrl) {
        this._service = new ModelCrudServiceImplementation<T, P>(Model);
        this._template = template;
        this._redirectUrl = redirectUrl;
    }

    async get(request, response) {
        const context: { [ky: string]: any } = {};
        if (request.params.id !== undefined) {
            context['object'] = await this._service.getBy({id: request.params.id});
        }
        response.render(this._template, context);
    }

    async post(request: Request, response: Response) {
        const promise: Promise<P> = request.params.id !== undefined ? this._service.update(request.body, Number(request.params.id)) : this._service.create(request.body)
        try {
            await promise;
            response.redirect(this._redirectUrl)
        } catch (err) {
            response.status(500)
        }
    }
}
