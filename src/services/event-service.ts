import {ModelCrudServiceImplementation} from "./implementations/ModelCrudService";
import {Event, EventModel, modelConfig} from "../entities/Event";
import {eventRepository} from "../repositories";
import {IModelCrudService} from "./interfaces/IModelCrud";

const eventService: IModelCrudService<EventModel, Event> = ModelCrudServiceImplementation<EventModel, Event>(eventRepository, modelConfig);
export default eventService;
