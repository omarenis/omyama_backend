import EventModel, {Event} from "../../../entity/Event";
import {FormViewImplementation} from "../../framework/IFormView";
import {Request, Response} from "express";

const {upload} = require('../../../../appConfig');

export class SingleEvent extends FormViewImplementation<EventModel, Event> {
    constructor() {
        super(EventModel, 'dashboard/events/single.twig', '/web/events');
    }

    async post(request: Request, response: Response) {
        upload.single('image')(request, response, (err) => {
            console.log(err);
        });
        response.redirect(this._redirectUrl);
    }
}
