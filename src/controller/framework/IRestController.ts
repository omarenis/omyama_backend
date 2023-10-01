import {Request, Response} from "../../../appConfig";

export interface IRestController<P> {
    get(request: Request, response: Response): Promise<void>;
    post(request: Request, response: Response): Promise<P>;
    put(request: Request, response: Response): Promise<P>;
    delete(request: Request, response: Response): Promise<void>;
}
