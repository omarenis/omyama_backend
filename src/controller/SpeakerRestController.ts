import EventModel, { Event } from "../entity/Event";
import { Speaker, SpeakerModel } from "../entity/Speaker";
import { RestModelController } from "./ModelCrudController";

export class SpeakerRestController extends RestModelController<SpeakerModel, Speaker> {
    constructor() {
        super(SpeakerModel);
    }
}
