import {ModelTemplate} from "../../framework/ModelCrudController";
import {Page, PageModel} from "../../../entity/cms/Page";
import {Request, Response} from "../../../../appConfig";

export class PageListTemplate extends ModelTemplate<PageModel, Page> {
    private max = 0;
    constructor() {
        super('dashboard/events/pages/list.twig', PageModel, '/dashboard/events/pages');
    }

    async get(request: Request, response: Response): Promise<void>
    {
        return response.render(this.template, {pages: await this.service.findAll()});
    }

    async post(request: Request, response: Response): Promise<Response> {
        let page = await this.service.findOneBy({title: request.body.title});
        if(page !== null)
        {
            response.status(400);
            response.json({message: 'page exists with the same title'});
            return ;
        }
        page = await this.service.create({
            title: request.body.title,
            order: request.body.order,
            event: Number(request.query.event)
        });
        return response.json(page).status(201);
    }
}
