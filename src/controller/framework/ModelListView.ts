import {Request, Response} from 'express';
import {IModelCrudService} from "../../services/interfaces/IModelCrud";

export interface IModelListView<T, P> {
    _service: IModelCrudService<T, P>,
    _template: string,
    _urlForm: string,
    get(request: Request, response: Response): Promise<void>;
}

export function IModelListViewImplementation<T, P>(template: string, urlForm: string, service: IModelCrudService<T, P>): IModelListView<T, P> {
    return {
        _service: service,
        _template: template,
        _urlForm: urlForm,
        async get(request: Request, response: Response): Promise<void> {
             response.render(this._template, {_objects: await this._service.findAll()})
        }
    }
}
