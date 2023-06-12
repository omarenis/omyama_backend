import {Participation, ParticipationModel} from "../entity/Participation";
import {ModelTemplate} from "./framework/ModelCrudController";
import {ModelCrudServiceImplementation} from "../services/implementations/ModelCrudService";
import EventModel, { Event } from "../entity/Event";

export class ParticipationTemplate extends ModelTemplate<ParticipationModel, Participation> {
    private eventService = new ModelCrudServiceImplementation<EventModel, Event>(EventModel);
    constructor() {
        super('public/publications/participate.twig', ParticipationModel, '/public/events');
     }

    async get(request, response): Promise<void> {
        console.log(this.service.list());
        const events = this.eventService.list();
        response.render(this.template, {events: this.eventService.list()})
    }

    post(request, response): Promise<void> {
        const event = this.eventService.getBy({id: request.body.id});
        console.log(event);

    }
}
