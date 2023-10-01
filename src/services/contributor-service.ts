import {ModelCrudServiceImplementation} from "./implementations/ModelCrudService";
import {Contributor, ContributorModel, modelConfig} from "../entities/Contributor";
import {contributorRepository} from "../repositories";
import {IModelCrudService} from "./interfaces/IModelCrud";

const contributorService: IModelCrudService<ContributorModel, Contributor> = ModelCrudServiceImplementation<ContributorModel, Contributor>(contributorRepository, modelConfig);
export default contributorService;
