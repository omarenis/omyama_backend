import {Request, Response} from "express";
import {ModelCrudServiceImplementation} from "../../services/implementations/ModelCrudService";
import {User, UserModel} from "../../entities/User";
import {userRepository} from "../../repositories";
import {IModelCrudService} from "../../services/interfaces/IModelCrud";
const _userService: IModelCrudService<UserModel, User> = ModelCrudServiceImplementation<UserModel, User>(userRepository);
export const ILoginTemplateInstance= {
        get(request: Request, response: Response) {
            response.render('public/interfaces/auth/login.twig');
        },
        async post(request: any, response: Response) {
            const username = request.body.username;
            const user = await _userService.findOneBy({username});
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
            if (!user.is_active) {
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
