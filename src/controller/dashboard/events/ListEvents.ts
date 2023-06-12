import { FormViewImplementation } from "../../framework/IFormView";
import EventModel from "../../../entity/Event";
import Event from "../../../entity/Event";

export class EventList extends FormViewImplementation<EventModel, Event>{
    constructor() {
        super(EventModel, 'dashboard/events/list.twig', 'dashboard/events/');
    }
}
