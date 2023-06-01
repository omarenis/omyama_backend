import {ModelCrudServiceImplementation} from "../services/implementations/ModelCrudService";

export interface IFormView<T, P> {

}


export class FormViewImplementation<T, P> implements IFormView<T, P> {
    private _service: ModelCrudServiceImplementation<T, P>
    constructor(Model, template, redirectUrl) {
        this._service = new ModelCrudServiceImplementation<T, P>(Model);
    }

    async get(request, response)
    {
        const context: {[ky: string]: any} = {};
        if(request.params.id !== undefined) {
            context['object'] = await this._service.getBy({id: request.params.id});
        }
        response.render()
    }
}
