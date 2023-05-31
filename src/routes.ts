import {ILoginTemplate} from "./controller/ILoginTemplate";
import {SignupTemplate} from "./controller/SignupTemplate";

export const Routes = [{
    method: 'get',
    route: '/auth/login',
    controller: ILoginTemplate,
    action: 'get'
}, {
    method: 'post',
    route: '/auth/login',
    controller: ILoginTemplate,
    action: 'post'
},
    {
        method: 'get',
        route: '/auth/signup',
        controller: SignupTemplate,
        action: 'get'
    }, {
    method: 'post',
        route: '/auth/signup',
        controller: SignupTemplate,
        action: 'post'
    }];
