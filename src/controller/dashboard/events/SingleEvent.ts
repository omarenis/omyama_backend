import EventModel, { Event } from "../../../entity/Event";
import {FormViewImplementation} from "../../framework/IFormView";

export class SingleEvent extends FormViewImplementation<EventModel, Event> {
        constructor() {
        super(EventModel, 'dashboard/events/single.twig', '/dashboard/events');
    }
}
