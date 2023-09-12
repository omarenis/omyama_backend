import {ModelCrudServiceImplementation} from "../../../services/implementations/ModelCrudService";
import {Contributor, ContributorModel, modelConfig} from "../../../entity/Contributor";
import {Request, Response} from "../../../../appConfig";

export const  ContributorController  = () => {
    const service = new ModelCrudServiceImplementation<ContributorModel, Contributor>(ContributorModel, modelConfig)
    return {
        get: async (request: Request, response: Response) => {
            const contributors = await service.findBy({
                event: {id: request.params.id}
            });
            response.render('dashboard/events/contributors.twig', { contributors});
        },
        post: async (request: Request, response: Response) => {
            try {
                const contributor: Contributor = {
                    fullName: request.body.fullName,
                    position: request.body.position,
                    contribution: request.body.contribution,
                    image: request.files.image,
                    description: request.body.description
                }
            } catch(err) {

            }
        },
        put: (request: Request, response: Response) => {

        },
        delete: (request: Request, response: Response) => {

        }
    }
}
