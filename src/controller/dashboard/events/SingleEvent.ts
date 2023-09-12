import EventModel, {Event, modelConfig as eventModelConfig} from "../../../entity/Event";
import {FormViewImplementation} from "../../framework/IFormView";
import {Request, Response} from "express";

const {upload, saveFile} = require('../../../../appConfig');

export class SingleEvent extends FormViewImplementation<EventModel, Event> {
    constructor() {
        super(EventModel, 'dashboard/events/single.twig', '/web/events', eventModelConfig);
    }

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
            console.log(request.body);
        const events = await this._service.findOneBy({title: request.body.title});
        if (events !== null) {
            response.render(this._template, {message: 'event is already created'});
        }
        }
        if(event === null) {
            const data: Event = {
                title: request.body.title,
                description: request.body.description,
                image: request.files.image,
                dateStart: new Date(request.body.dateStart),
                dateEnd: new Date(request.body.dateEnd),
                address: request.body.address,
                hosting: request.body.hosting,
                priceHosting: !isNaN(Number(request.body.priceHosting)) ? Number(request.body.priceHosting) : 0,
                priceTransporting: !isNaN(Number(request.body.priceTransporting)) ?  Number(request.body.priceTransporting) : 0,
                url: request.body.url,
                isOnline: request.body.url !== '',
                customer: request.session['user'].profile,
            };
            try {
                const uploaded = await saveFile(request.files.image);
                const _ = await this._service.create(data);
                console.log(_);
                response.redirect('/dashboard/events');
            } catch (err) {
                console.log(err);
                return response.render(this._template, {message: err.message})
            }
        }
    }
}
