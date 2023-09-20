import {Request, Response} from "express";
import {ModelCrudServiceImplementation} from "../../services/implementations/ModelCrudService";
import {User, UserModel} from "../../entity/User";

export class ILoginTemplate {
    private _userService;

    constructor() {
        this._userService = new ModelCrudServiceImplementation<UserModel, User>(UserModel);
    }

    get(request: Request, response: Response) {
        response.render('public/interfaces/auth/login.twig');
    }

    async post(request: any, response: Response) {
        const username = request.body.username;
        const user = await this._userService.getBy({username});
        if (user === null) {
            return response.render('public/interfaces/auth/login.twig', {
                message: 'user not found with the specified username',
                category: 404
            });
        }
        if (!await user.check_password(request.body.password)) {
            return response.render('public/interfaces/auth/login.twig', {
                message: 'password did not match',
                category: 403
            });
        }
        if(!user.is_active)
        {
            return response.render('public/interfaces/login.twig', {
                message: 'compte onn active appelez administrateur pour voir le probléme ',
                category: 401
            })
        }
        request.session.user = user;
        await request.session.save(function (err) {
        }, (data) => {
        });
        response.redirect('/');
    }
}
