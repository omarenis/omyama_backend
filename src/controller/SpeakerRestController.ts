import EventModel, { Event } from "../entity/Event";
import { Contributor, ContributorModel } from "../entity/Contributor";
import { RestModelController } from "./framework/ModelCrudController";

export class SpeakerRestController extends RestModelController<ContributorModel, Contributor> {
    constructor() {
        super(ContributorModel);
    }
}
