import {FormViewImplementation} from "./framework/IFormView";
import {Participation, ParticipationModel} from "../entity/Participation";
import  {Request, Response} from "express";

class  Payment extends FormViewImplementation<ParticipationModel, Participation> {
    constructor() {
        super(ParticipationModel, 'public/payment.twig', '/web/confirm');
    }

    async get(request: Request, response: Response)
    {

    }
}
