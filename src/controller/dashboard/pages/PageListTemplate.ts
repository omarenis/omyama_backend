import {ModelTemplate} from "../../framework/ModelCrudController";
import {Page, PageModel} from "../../../entity/cms/Page";
import {Request, Response} from "../../../../appConfig";

export class PageListTemplate extends ModelTemplate<PageModel, Page> {
    constructor() {
        super('dashboard/events/pages/list.twig', PageModel, '/dashboard/events/pages');
    }

    async get(request: Request, response: Response): Promise<void>
    {
        const pages = await this.service.findBy({event: {id: request.query.eventId}});
        console.log(pages);
        return response.render(this.template, {pages})
    }
}
