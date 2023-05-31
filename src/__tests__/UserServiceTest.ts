import {ModelCrudServiceImplementation} from "../services/implementations/ModelCrudService";
import EventModel, {Event} from "../entity/Event";


const eventService = new ModelCrudServiceImplementation<EventModel, Event>(EventModel);
it('add service', async function () {
    const event = new Event('title', 'description', 'imagePath', new Date('2018-01-02'), new Date('2018-01-02'), 'address', 'hosting', 15.02, 15.02);
    let result = await eventService.create(event);
    console.log(result);
});
