import {Event, EventModel} from "../../../entities/Event";
import {IModelListView, IModelListViewImplementation} from "../../framework/ModelListView";
import eventService from "../../../services/event-service";


export const EventList: IModelListView<EventModel, Event> = IModelListViewImplementation<EventModel, Event>('dashboard/events/list.twig', 'web/events/create', eventService);
