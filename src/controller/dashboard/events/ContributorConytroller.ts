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
            response.render('dashboard/events/contributors.twig', { contributors, _object: request.params.id});
        },
        post: async (request: any, response: Response) => {
            console.log(request);
            try {
                console.log(request.files);
                const contributor: Contributor = {
                    fullName: request.body.fullName,
                    position: request.body.position,
                    contribution: request.body.contribution !== undefined ? request.body.contribution : 'unknow',
                    image: request.files.image,
                    description: request.body.description
                }
                console.log(contributor);
            } catch(err) {
                console.log(err);
            }
        },
        put: (request: Request, response: Response) => {

        },
        delete: (request: Request, response: Response) => {

        }
    }
}
