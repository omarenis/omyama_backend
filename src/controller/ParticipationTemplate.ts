import { Participation, ParticipationModel } from "../entity/Participation";
import { ModelTemplate } from "./ModelCrudController";

export class ParticipationTemplate implements ModelTemplate<ParticipationModel, Participation>{
    constructor() {
        super('');
    }
}