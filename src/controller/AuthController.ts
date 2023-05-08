/*
import {Request, Response} from 'express';
import { ModelCrudService } from '../services/implementations/ModelCrudService';
import { IModelCrud } from '../services/interfaces/IModelCrud';
import {User} from "../entity/User";
class AuthController {
    private service: IModelCrud<User>;
    constructor()
    {
        this.service = new ModelCrudService<Person>(Person);
    }
    async login(request: Request, response: Response, next: Function)
    {
        if(request.method == 'GET')
        {
            response.render('auth/login.njk');
        }
        else
        {
            response.redirect('/');
        }

    }
}

*/
