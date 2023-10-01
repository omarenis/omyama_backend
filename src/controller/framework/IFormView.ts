import {Request, Response} from "../../../appConfig";
import {IModelCrudService} from "../../services/interfaces/IModelCrud";

export interface IFormView<T, P> {
    _service: IModelCrudService<T, P>,
    _template: string,
    _redirectUrl: string;

    post(request: Request, response: Response): Promise<void>;

    get(request: Request, response: Response): Promise<void>;
}

export function FormViewImplementation<T, P>(service: IModelCrudService<T, P>, template: string, redirectUrl: string): IFormView<T, P> {
    return {
        _service: service,
        _template: template,
        _redirectUrl: redirectUrl,
        get: async (request: Request, response: Response) => {
            const context: { [ky: string]: any } = {};
            console.log(request.params.id);
            if (request.params.id !== 'create') {
                context['_object'] = await service.findOneBy({id: request.params.id});
            }
            console.log(context);
            response.render(template, context);
        },
        post: async (request: Request, response: Response) => {
            const promise: Promise<P> = request.params.id !== 'create' ? service.put(request.body, Number(request.params.id)) : service.create(request.body);
            try {
                await promise;
                response.redirect(this._redirectUrl);
            } catch (err) {
                response.status(500);

            }
        }
    }
}

export function FormViewImplementationWithAjax<T, P>(service: IModelCrudService<T, P>, template: string, redirectUrl: string, modelConfig = undefined): IFormView<T, P> {

    return {
        _service: service,
        _template: template,
        _redirectUrl: redirectUrl,
        get: async (request: Request, response: Response) => {
            const context: { [ky: string]: any } = {};
            if (request.params.id !== 'create') {
                context['_object'] = await service.findBy({id: request.params.id});
            }
            response.render(template, context);
        },
        post: async (request: Request, response: Response) => {
            const promise: Promise<P> = request.params.id !== 'create' ? service.put(request.body, Number(request.params.id)) : service.create(request.body);
            try {
                await promise;
                response.json({});
            } catch (err) {
                response.status(500);
            }
        }
    }
}
