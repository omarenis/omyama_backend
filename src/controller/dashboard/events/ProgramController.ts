import {IRestController} from "../../framework/IRestController";
import { ProgramItem } from "../../../entities/ProgramIntem";
import {Request, Response} from "../../../../appConfig";

const ProgramController: IRestController<ProgramItem> = {
    get: async (request: Request, response: Response) => {

    },
    post: async (Request, response: Response) => {},
    put: async (Request, response: Response) => {},
    delete: async (Request, response: Response) => {}
}
