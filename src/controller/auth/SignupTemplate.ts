import {Request, Response} from "express";
import {IModelCrudService} from "../../services/interfaces/IModelCrud";
import {User, UserModel} from "../../entity/User";
import {UserServiceImplementation} from "../../services/implementations/UserServiceImplementation";

export class SignupTemplate {
    private readonly service: IModelCrudService<User>;

    constructor() {
        this.service = new UserServiceImplementation();
    }

    async get(request: Request, response: Response) {
        return response.render('public/interfaces/auth/signup.twig');
    }

    async post(request: Request, response: Response) {
        let user = await this.service.getBy({email: request.body.email});
        if (user !== null) {
            request.flash('user found with the specified username', 'error');
        } else {
            user = await this.service.getBy({username: request.body.username});
            if (user !== null) {
                response.render('public/interfaces/signup.twig', {
                    message: 'user found with the specified email',
                    category: 400
                });
            } else {
                try {
                    await this.service.create({
                        username: request.body.username,
                        email: request.body.email,
                        password: request.body.password,
                        profile: {
                            firstname: request.body.firstname,
                            lastname: request.body.lastname,
                            address: request.body.address,
                            gainedAmount: 0,
                            phone: request.body.phone
                        }
                    });
                    response.redirect('/');
                    return;
                } catch (err) {
                    response.status(404);
                }
            }
        }
        return response.render('public/auth/signup.twig');
    }
}
