import {Request, Response} from 'express';
import {ModelCrudServiceImplementation} from "../../services/implementations/ModelCrudService";

export interface IModelListView<T, P> {
    get(request: Request, response: Response): Promise<void>;
}

export interface IModelListViewWithAjax<T, P> extends IModelListView<T, P> {
    post(request: Request, response: Response): Promise<void>;

    put(request: Request, response: Response): Promise<void>;

    delete(request: Request, response: Response): Promise<void>;
}

export class IModelListViewImplementation<T, P> implements IModelListView<T, P> {
    private _modelService: ModelCrudServiceImplementation<T, P>
    private readonly _template: string;
    private _urlForm: string;

    constructor(template: string, urlForm: string) {
        this._template = template;
        this._urlForm = urlForm;
    }

    async get(request: Request, response: Response): Promise<void> {
        response.render(this._template, {dataList: await this._modelService.list()})
    }
}


export class IModelListViewWithAjaxImplementation<T, P> implements IModelListViewWithAjax<T, P> {
    private
    private _modelService: ModelCrudServiceImplementation<T, P>;
    private _template: string;

    async get(request: Request, response: Response): Promise<void> {
        response.status(200);
        response.render(this._template, {dataList: await this._modelService.list()})
    }

    async post(request, response): Promise<void> {
        try {
            const data = await this._modelService.create(request.body);
            response.status(201);
            response.json(data);
        } catch (err) {
            response.status(500);
            response.json({
                message: 'erreur dans le serveur'
            })
        }
    }

    async delete(request: Request, response: Response): Promise<void> {
        try {
            await this._modelService.delete(Number(request.params.id));
        } catch (err) {
            response.status(500);
            response.json({message: err.message.toString()})
        }
    }

    put(request, response): Promise<void> {
        return Promise.resolve(undefined);
    }
}
