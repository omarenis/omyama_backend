import {FormViewImplementation} from "../../framework/IFormView";
import {Intervenor, IntervenorModel} from "../../../entity/Intervenor";

class IntervenorFormView extends FormViewImplementation<IntervenorModel, Intervenor> {
    constructor() {
        super(IntervenorModel, 'dashboard/intervenors/single.twig', 'dashboard/events');
    }
}
