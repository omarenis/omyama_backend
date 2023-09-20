import {ModelCrudServiceImplementation} from "../../../services/implementations/ModelCrudService";
import {Contributor, ContributorModel, modelConfig} from "../../../entity/Contributor";
import {Request, Response} from "../../../../appConfig";
import {AppDataSource} from "../../../data-source";
import {EventModel} from "../../../entity/Event";

export const  ContributorController  = () => {
    const service = new ModelCrudServiceImplementation<ContributorModel, Contributor>(ContributorModel, modelConfig);
    const eventRepository = AppDataSource.getRepository(EventModel);
    return {
        get: async (request: Request, response: Response) => {
            const contributors = await service.findBy({
                event: {id: request.params.id}
            });
            response.render('dashboard/events/contributors.twig', { contributors, _object: request.params.id});
        },
        post: async (request: any, response: Response) => {
            try {
                const contributor: Contributor = {
                    fullName: request.body.fullName,
                    position: request.body.position,
                    contribution: request.body.contribution,
                    image: request.files.image,
                    description: request.body.description,
                    event: await eventRepository.findOneBy({id: Number(request.params.id)}),
                    google: request.body.google,
                    facebook: request.body.facebook,
                    linkedin: request.body.linkedin
                }
                await  service.create(contributor);
            } catch(err) {
            }
        },
        put: (request: Request, response: Response) => {

        },
        delete: (request: Request, response: Response) => {

        }
    }
}
