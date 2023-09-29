import {Request, Response} from 'express';
import {IModelCrudService} from "../../services/interfaces/IModelCrud";
import {ITemplateController} from "./ITemplateController";
export function ModelTemplate<T, P>(template: string, service: IModelCrudService<T, P>, urlRedirect: string): ITemplateController<T, P> {
    return {
        _template: template,
         _service: service,
        _urlRedirect: urlRedirect,
        async get(request: Request, response: Response,) {
            response.render(this._template, {instances: this._service.findAll()});
        },
        async post(request: Request, response: Response): Promise<void> {
            try {
                await this.service.create(request.body);
                return response.redirect(this._urlRedirect);
            } catch {
                request.flash("error",);
                response.redirect("")
            }
            return response.render(this._template);
        }
    }
}
