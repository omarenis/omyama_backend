import EventModel, { Event } from "../entity/Event";
import { Intervenor, IntervenorModel } from "../entity/Intervenor";
import { RestModelController } from "./framework/ModelCrudController";

export class SpeakerRestController extends RestModelController<IntervenorModel, Intervenor> {
    constructor() {
        super(IntervenorModel);
    }
}
