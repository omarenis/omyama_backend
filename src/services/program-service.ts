import {ModelCrudServiceImplementation} from "./implementations/ModelCrudService";
import {ProgramItem, ProgramItemModel, modelConfig} from "../entities/ProgramIntem";
import {IModelCrudService} from "./interfaces/IModelCrud";
import {programRepository} from "../repositories";

const programService: IModelCrudService<ProgramItemModel, ProgramItem> = ModelCrudServiceImplementation<ProgramItemModel, ProgramItem>(programRepository, modelConfig);
export default programService;
