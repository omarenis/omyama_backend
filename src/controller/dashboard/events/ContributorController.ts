import {ModelCrudServiceImplementation} from "../../../services/implementations/ModelCrudService";
import {Contributor, ContributorModel, modelConfig} from "../../../entities/Contributor";
import {Request, Response} from "../../../../appConfig";
import {contributorRepository, eventRepository} from "../../../repositories";
import {IModelCrudService} from "../../../services/interfaces/IModelCrud";

const service: IModelCrudService<ContributorModel, Contributor> = ModelCrudServiceImplementation<ContributorModel, Contributor>(contributorRepository, modelConfig);

export const ContributorController = {
    get: async (request: Request, response: Response): Promise<void> => {
        const contributors: Contributor[] = await service.findBy({
            event: {id: request.params.id}
        });
        response.render('dashboard/events/contributors.twig', {contributors, _object: request.params.id});
    },
    post: async (request: any, response: Response): Promise<Contributor> => {
        try {
            const contributor: Contributor = {
                fullName: request.body.fullName,
                position: request.body.position,
                contribution: request.body.contribution,
                image: request.files.image,
                description: request.body.description,
                company: request.body.company,
                event: await eventRepository.findOneBy({id: Number(request.params.id)}),
                google: request.body.google,
                facebook: request.body.facebook,
                linkedin: request.body.linkedin
            }
            return service.create(contributor);
        } catch (err) {
        }
    },
    put: (request: Request, response: Response) => {

    },
    delete: (request: Request, response: Response) => {

    }
}
