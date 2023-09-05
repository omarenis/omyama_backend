import EventModel, {Event} from "../../../entity/Event";
import {FormViewImplementation} from "../../framework/IFormView";
import {Request, Response} from "express";
import {join} from "path";

const {upload, saveFile} = require('../../../../appConfig');

export class SingleEvent extends FormViewImplementation<EventModel, Event> {
    constructor() {
        super(EventModel, 'dashboard/events/single.twig', '/web/events');
    }
    private uploadEventFile() {}
    async post(request: Request, response: Response) {
        let event = null;
        if(request.params.id !== 'create')
        {
            event = await this._service.findById(Number(request.params.id));
            if(event === null)
            {
                response.render('404.twig', { message: 'Event not found' });
            }
        } else {
        const events = await this._service.findOneBy({title: request.body.title});
        if (events.length > 0) {
            response.render(this._template, {message: 'event is already created'});
        }
        }
        if(event === null) {
            const data: Event = {
                title: request.body.title,
                description: request.body.description,
                imagePath: `uploads/${request.files.image['name']}`,
                dateStart: new Date(request.body.dateStart),
                dateEnd: new Date(request.body.dateEnd),
                address: request.body.address,
                hosting: request.body.hosting,
                priceHosting: request.body.priceHosting,
                priceTransporting: request.body.priceTransporting,
            };
            try {
                const uploaded = await saveFile(request.files.image);
                const _ = await this._service.create(data);
                response.redirect('/dashboard/events');
            } catch (err) {
                return response.render(this._template, {message: err.message})
            }
        }
    }
}
