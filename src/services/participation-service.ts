import {ModelCrudServiceImplementation} from "./implementations/ModelCrudService";
import {Participation, ParticipationModel} from "../entities/Participation";
import {participationRepository} from "../repositories";

const participationService = ModelCrudServiceImplementation<ParticipationModel, Participation>(participationRepository);
export default participationService;
