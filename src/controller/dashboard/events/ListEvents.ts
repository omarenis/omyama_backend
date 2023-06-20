import EventModel from "../../../entity/Event";
import Event from "../../../entity/Event";
import {IModelListViewImplementation} from "../../framework/ModelListView";

export class EventList extends IModelListViewImplementation<EventModel, Event>{
    constructor() {
        super(EventModel, 'dashboard/events/list.twig', 'web/events/create');
    }
}
