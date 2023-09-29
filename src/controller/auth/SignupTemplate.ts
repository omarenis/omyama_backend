import {Request, Response} from "express";
import {userService} from "../../services/user-service";

export const SignUpTemplateInstance =  {
        async get(_: Request, response: Response) {
            return response.render('public/interfaces/auth/signup.twig');
        },
        async post(request: Request, response: Response) {
            let user = await userService.findOneBy({email: request.body.email});
            if (user !== null) {
                request.flash('user found with the specified username', 'error');
            } else {
                user = await userService.findOneBy({username: request.body.username});
                if (user !== null) {
                    response.render('public/interfaces/signup.twig', {
                        message: 'user found with the specified email',
                        category: 400
                    });
                } else {
                    try {
                        await userService.create({
                            check_password(password: string): Promise<boolean> | undefined {
                                return Promise.resolve(undefined);
                            }, setPassword(password: string): Promise<void> | undefined {
                                return Promise.resolve(undefined);
                            },
                            username: request.body.username,
                            email: request.body.email,
                            password: request.body.password,
                            role: 'customer', is_active: true,
                            profile: {
                                firstname: request.body.firstname,
                                lastname: request.body.lastname,
                                address: request.body.address,
                                gainedAmount: 0,
                                phone: request.body.phone,
                            }
                        });
                        response.redirect('/');
                        return;
                    } catch (err) {
                        response.status(404);
                    }
                }
            }
            return response.render('/public/interfaces/auth/signup.twig');
        }
}
