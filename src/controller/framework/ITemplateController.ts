import {Request, Response} from "express";
export interface ITemplateController<P>
{
    get(request: Request, response: Response): Promise<void>;

    post(request: e.Request, response: e.Response): Promise<Response>;
}
