import {Request, Response} from "express";

export interface IRestController<P> {
    findAll(request: Request, response: Response): Promise<P[]>;
    create(request: Request, response: Response): Promise<P>;
    update(request: Request, response: Response): Promise<P>;
    delete(request: Request, response: Response): Promise<void>;
}
