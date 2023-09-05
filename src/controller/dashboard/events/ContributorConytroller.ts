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
        },
        post: async (request: Request, response: Response) => {

        },
        put: (request: Request, response: Response) => {

        },
        delete: (request: Request, response: Response) => {

        }
    }
}
