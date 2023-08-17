import {Request, Response} from "express";
import {ModelCrudServiceImplementation} from "../../services/implementations/ModelCrudService";
import {User, UserModel} from "../../entity/User";

export class ILoginTemplate {
    private _userService;

    constructor() {
        this._userService = new ModelCrudServiceImplementation<UserModel, User>(UserModel);
    }

    get(request: Request, response: Response) {
        response.render('public/interfaces/login.twig');
    }

    async post(request: any, response: Response) {
        const username = request.body.username;
        const user = await this._userService.getBy({username});
        if (user === null) {
            response.render('public/interfaces/login.twig', {
                message: 'user not found with the specified username',
                category: 404
            });
        } else if (! await user.check_password(request.body.password)) {
            response.render('public/interfaces/login.twig', {
                message: 'password did not match',
                category: 403
            });
        } else {
            request.session.user = user;
            console.log(request.session.user);
            await request.session.save(function (err) {
                console.log("err = ", err);
            }, function (data) {
                console.log(data);
            });
            console.log(request.session.user);
            response.redirect('/web/events');
        }
    }
}
