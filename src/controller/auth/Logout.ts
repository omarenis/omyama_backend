import { Request, Response } from "../../../appConfig"

const Logout = {
    get: (request: Request, response: Response) => {
        request.session.destroy();
        response.redirect('/');
    }
}
