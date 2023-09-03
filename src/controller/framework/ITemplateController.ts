import {Request, Response} from "express";
export interface ITemplateController<P>
{
    get(request: Request, response: Response): Promise<void>;

    post(request: Request, response: Response): Promise<Response | void>;
}
