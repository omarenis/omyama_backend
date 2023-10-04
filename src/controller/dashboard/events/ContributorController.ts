import {Contributor} from "../../../entities/Contributor";
import {Request, Response} from "../../../../appConfig";
import contributorService from "../../../services/contributor-service";

export const ContributorController = {
    get: async (request: Request, response: Response): Promise<void> => {
        const contributors: Contributor[] = await contributorService.findBy({
            event: {id: request.params.eventId}
        });
        response.render('dashboard/events/contributors.twig', {contributors, _object: request.params.id});
    },
    post: async (request: any, response: Response): Promise<Contributor> => {
        try {
            return await contributorService.create({
                fullName: request.body.fullName,
                position: request.body.position,
                contribution: request.body.contribution,
                image: request.files.image,
                description: request.body.description,
                company: request.body.company,
                event: Number(request.params.eventId),
                google: request.body.google,
                facebook: request.body.facebook,
                linkedin: request.body.linkedin,
            });
        } catch (err) {
            response.status(400);
            response.json({ error: err.message});
            response.send();
        }
    },
    put: async (request: Request, response: Response) => {
        try {
            return await contributorService.put({
                fullName: request.body.fullName,
                position: request.body.position,
                contribution: request.body.contribution,
                image: request.files.image,
                description: request.body.description,
                company: request.body.company,
                google: request.body.google,
                facebook: request.body.facebook,
                linkedin: request.body.linkedin,
            }, Number(request.params.id));
        } catch (err)
        {

        }
    },
    delete: (request: Request, response: Response) => {

    }
}
