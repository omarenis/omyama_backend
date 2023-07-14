import {Participation, ParticipationModel} from "../entity/Participation";
import {ModelTemplate} from "./framework/ModelCrudController";
import {ModelCrudServiceImplementation} from "../services/implementations/ModelCrudService";
import EventModel, {Event} from "../entity/Event";
import {Response, Request} from "express";
import {User, UserModel} from "../entity/User";

export class ParticipationTemplate extends ModelTemplate<ParticipationModel, Participation> {
    private participationService = new ModelCrudServiceImplementation<ParticipationModel, Participation>(ParticipationModel);
    private eventService = new ModelCrudServiceImplementation<EventModel, Event>(EventModel);
    private userService = new ModelCrudServiceImplementation<UserModel, User>(UserModel);

    constructor() {
        super('public/publications/participate.twig', ParticipationModel, '/public/events');
    }

    async get(request, response): Promise<void> {
        response.render(this.template, {
            events: this.eventService.list(),
            user: request.session.user
        });
    }

    async post(request, response: Response): Promise<void> {
        const event = this.eventService.getBy({id: request.body.id});
        let user: User;
        user = request.sesion.user;
        if (user === undefined) {
            user = {
                email: request.body.email,
                username: request.body.username,
                profile: {
                    address: request.body.address,
                    firstname: request.body.firstname,
                    lastname: request.body.lastname,
                    gainedAmount: 0,
                    phone: request.body.phone
                }
            }
        }
        // let user = request.session.user === undefined ? this.userService.create(): request.session.user;
        if (event === null) {
            response.render(this.template, {message: 'No event found'});
        }
    }
}
