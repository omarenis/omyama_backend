import { Request, Response } from "../../../appConfig";
import {ModelCrudServiceImplementation} from "../../services/implementations/ModelCrudService";

export interface IFormView<T, P> {

    post(request: Request, response: Response): Promise<void>;
    get(request: Request, response: Response): Promise<void>;
}


export class FormViewImplementation<T, P> implements IFormView<T, P> {
    protected _service: ModelCrudServiceImplementation<T, P>;
    protected readonly _template: string;
    protected readonly _redirectUrl: string;

    constructor(Model, template, redirectUrl, modelConfig = undefined) {
        this._service = new ModelCrudServiceImplementation<T, P>(Model, modelConfig);
        this._template = template;
        this._redirectUrl = redirectUrl;
    }

    async get(request: Request, response: Response) {
        const context: { [ky: string]: any } = {};
        if (request.params.id !== 'create') {
            console.log(request.params);
            context['_object'] = await this._service.getBy({id: request.params.id});
        }
        console.log(context);
        response.render(this._template, context);
    }

    async post(request: Request, response: Response) {
        const promise: Promise<P> = request.params.id !== 'create' ? this._service.update(request.body, Number(request.params.id)) : this._service.create(request.body);
        try {
            await promise;
            response.redirect(this._redirectUrl);
        } catch (err) {
            console.log(err);
            response.status(500);

        }
    }
}
