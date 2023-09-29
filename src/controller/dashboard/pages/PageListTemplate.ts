import {ModelTemplate} from "../../framework/ModelCrudController";
import {Page, PageModel} from "../../../entities/cms/Page";
import {Request, Response} from "../../../../appConfig";
import {pageRepository} from "../../../repositories";
import {pageService} from "../../../services/page-service";

export const PageListTemplate = ModelTemplate<PageModel, Page>('dashboard/events/pages/list.twig', pageService, '/dashboard/events/pages');

PageListTemplate.get = async function (request: Request, response: Response) {
     return response.render(this._template, {pages: await this.service.findAll()});
}

PageListTemplate.post = async function (request: Request, response: Response) {
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
        response.json(page).status(201);
}
