import {Contributor, ContributorModel} from "../../../entities/Contributor";
import {ModelCrudServiceImplementation} from "../../../services/implementations/ModelCrudService";
import {contributorRepository} from "../../../repositories";

const ContributorFormView = ()  => {
    const contributorsService =  ModelCrudServiceImplementation<ContributorModel, Contributor>(contributorRepository);
    return {
        get: () => {

        }
    }
}
