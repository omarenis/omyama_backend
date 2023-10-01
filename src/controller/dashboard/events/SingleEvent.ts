import {Event, EventModel, modelConfig} from "../../../entities/Event";
import {FormViewImplementation} from "../../framework/IFormView";
import {Request, Response} from "express";
import {eventRepository} from "../../../repositories";
import {ModelCrudServiceImplementation} from "../../../services/implementations/ModelCrudService";

const {upload, saveFile} = require('../../../../appConfig');

export const SingleEvent = FormViewImplementation<EventModel, Event>(ModelCrudServiceImplementation<EventModel, Event>(eventRepository, modelConfig), 'dashboard/events/single.twig', '/dashboard/events');
SingleEvent.post = async (request: Request, response: Response) => {
    let event = null;
    if (request.params.id !== 'create') {
        event = await SingleEvent._service.findById(Number(request.params.id));
        if (event === null) {
            response.render('404.twig', {message: 'Event not found'});
        }
    } else {
        console.log(request.body);
        const events = await SingleEvent._service.findOneBy({title: request.body.title});
        if (events !== null) {
            response.render(SingleEvent._template, {message: 'event is already created'});
        }
    }
    if (event === null) {
        const data: Event = {
            title: request.body.title,
            description: request.body.description,
            image: request.files.image,
            dateStart: new Date(request.body.dateStart),
            dateEnd: new Date(request.body.dateEnd),
            address: request.body.address,
            hosting: request.body.hosting,
            priceHosting: !isNaN(Number(request.body.priceHosting)) ? Number(request.body.priceHosting) : 0,
            priceTransporting: !isNaN(Number(request.body.priceTransporting)) ? Number(request.body.priceTransporting) : 0,
            url: request.body.url,
            isOnline: request.body.url !== '',
            customer: request.session['user'].profile,
        };
        try {
            await saveFile(request.files.image);
            await SingleEvent._service.create(data);
            response.redirect('/dashboard/events');
        } catch (err) {
            return response.render(SingleEvent._template, {message: err.message})
        }
    }
}
