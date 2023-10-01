import {Contributor} from "../../../entities/Contributor";
import {Request, Response} from "../../../../appConfig";
import contributorService from "../../../services/contributor-service";

export const ContributorController = {
    get: async (request: Request, response: Response): Promise<void> => {
        const contributors: Contributor[] = await contributorService.findBy({
            event: {id: request.params.eventId}
        });
        console.log(contributors);
        response.render('dashboard/events/contributors.twig', {contributors, _object: request.params.id});
    },
    post: async (request: any, response: Response): Promise<Contributor> => {
        try {
            console.log({
                fullName: request.body.fullName,
                position: request.body.position,
                contribution: request.body.contribution,
                image: request.files.image,
                description: request.body.description,
                company: request.body.company,
                event: request.params.eventId,
                google: request.body.google,
                facebook: request.body.facebook,
                linkedin: request.body.linkedin,
            });
            return await contributorService.create({
                fullName: request.body.fullName,
                position: request.body.position,
                contribution: request.body.contribution,
                image: request.files.image,
                description: request.body.description,
                company: request.body.company,
                event: request.params.eventId,
                google: request.body.google,
                facebook: request.body.facebook,
                linkedin: request.body.linkedin,
            });
        } catch (err) {
            console.log(err);
        }
    },
    put: (request: Request, response: Response) => {

    },
    delete: (request: Request, response: Response) => {

    }
}
