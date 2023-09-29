import {Request, Response} from "express";
import {IModelCrudService} from "../../services/interfaces/IModelCrud";
export interface ITemplateController<T,P>
{
    _template: string;
    _service: IModelCrudService<T, P>;
    _urlRedirect: string;
    get(request: Request, response: Response): Promise<void>;
    post(request: Request, response: Response): Promise<Response | void>;
}
