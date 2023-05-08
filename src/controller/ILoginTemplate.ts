import {Request, Response} from "express";

class ILoginTemplate {
    constructor() {
    }

    get(request: Request, response: Response) {
        response.render('interfaces/login.twig');
    }
    post () {
        
    }
}
