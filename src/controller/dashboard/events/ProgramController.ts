import {IRestController} from "../../framework/IRestController";
import {ProgramItem} from "../../../entities/ProgramIntem";
import {Request, Response} from "../../../../appConfig";
import programService from "../../../services/program-service";
import contributorService from "../../../services/contributor-service";
const ProgramController: IRestController<ProgramItem> = {
    get: async (request: Request, response: Response) => {
        console.log(request.params);
        response.render('dashboard/events/program.twig', { programs: await programService.findBy({
            contributor: {
                event: {
                    id: Number(request.params.id)
                }
            }
        }), contributors: contributorService.findBy({ event: {id: Number(request.params.id)}, contribution: 'speaker' })} );
    },
    post: async (request: Request, response: Response) => {
        try {
            return await programService.create({
                contributor: Number(request.body.contributor),
                description: request.body.description,
                title: request.body.title
            });
        } catch (error) {
            response.json({message: error.message})
            response.status(400);
            response.send();
        }
    },
    put: async (request: Request, response: Response) => {
        return null;
    },
    delete: async (Request, response: Response) => {

    }
}
export default ProgramController;
