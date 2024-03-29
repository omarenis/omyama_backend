import {ModelTemplate} from "../../../framework/ModelCrudController";
import {Page, PageModel} from "../../../../entities/cms/Page";
import {Request, Response} from "../../../../../appConfig";
import {pageService} from "../../../../services/page-service";
import {ITemplateController} from "../../../framework/ITemplateController";

export const PageListTemplate: ITemplateController<PageModel, Page> = ModelTemplate<PageModel, Page>('dashboard/events/pages/list.twig', pageService, '/dashboard/events/pages');

PageListTemplate.get = async (request: Request, response: Response) => {
     return response.render('', {pages: await pageService.findAll()});
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
