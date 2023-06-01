import EventModel, { Event } from "../entity/Event";
import { ModelTemplate } from "./ModelCrudController";

export class EventTemplate extends ModelTemplate<EventModel, Event>{
    constructor() {
        super('dashboard/events/list.twig', EventModel, '/wweb/events');
    }
}
