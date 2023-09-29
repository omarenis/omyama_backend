import {ModelCrudServiceImplementation} from "./implementations/ModelCrudService";
import {Page, PageModel} from "../entities/cms/Page";
import {pageRepository} from "../repositories";

export const pageService = ModelCrudServiceImplementation<PageModel, Page>(pageRepository, )
