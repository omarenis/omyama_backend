import {ILoginTemplate} from "./controller/ILoginTemplate";
import {SignupTemplate} from "./controller/SignupTemplate";
import {SpeakerRestController} from "./controller/SpeakerRestController";
import {EventTemplate} from "./controller/EventController";

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
    },
    // the events crud
        {
        method: 'get',
        route: '/web/events',
        action: 'get',
        controller: EventTemplate
    },,
    {
        method: 'post',
        route: '/web/events',
        action: 'post',
        controller: EventTemplate
    },
    {
        method: 'post',
        route: '/web/events/:id',
        action: 'get',
        controller: EventTemplate
    },
    // the Intervenors crud
    {
        method: 'get',
        route: '/api/intervenors',
        controller: SpeakerRestController,
        action: 'list'
    },
    {
        method: 'post',
        controller: SpeakerRestController,
        action: 'create',
        route: '/api/intervenors'
    },
    {
        method: 'put',
        controller: SpeakerRestController,
        action: 'update',
        route: '/api/intervenors'
    },
    {
        method: 'delete',
        controller: SpeakerRestController,
        action: 'delete',
        route: '/api/intervenors'
    },
];
