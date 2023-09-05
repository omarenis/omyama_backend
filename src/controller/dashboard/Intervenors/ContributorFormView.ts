import {FormViewImplementation} from "../../framework/IFormView";
import {Contributor, ContributorModel} from "../../../entity/Contributor";
import {ModelCrudServiceImplementation} from "../../../services/implementations/ModelCrudService";

const ContributorFormView = ()  => {
    const contributorsService = new ModelCrudServiceImplementation<ContributorModel, Contributor>(ContributorModel);
    return {
        get: () => {

        }
    }
}
