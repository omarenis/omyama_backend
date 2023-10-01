import {IRestController} from "../../framework/IRestController";
import {ProgramItem} from "../../../entities/ProgramIntem";
import {Request, Response} from "../../../../appConfig";
import programService from "../../../services/program-service";
const ProgramController: IRestController<ProgramItem> = {
    get: async (request: Request, response: Response) => {
        response.render('', {'programs': await programService.findBy({
            contributors: {
                event: request.params.id
            }
        })} );
    },
    post: async (request: Request, response: Response) => {
        try {
            return await programService.create({
                contributor: request.body.contributor,
                description: request.body.description,
                logo: request.files.logo,
                title: request.body.title
            });
        } catch (error) {
            response.json({message: error.message})
            response.status(400);
            response.send();
        }
    },
    put: async (request: Request, response: Response) => {
        console.log(request.params.eventId);
        console.log(request.params.id);
        return null;
    },
    delete: async (Request, response: Response) => {

    }
}
