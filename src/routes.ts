import {ILoginTemplate} from "./controller/auth/ILoginTemplate";
import {SignupTemplate} from "./controller/auth/SignupTemplate";
import {SpeakerRestController} from "./controller/SpeakerRestController";
import {EventTemplate} from "./controller/EventController";
import {SingleEvent} from "./controller/dashboard/events/SingleEvent";
import {EventList} from "./controller/dashboard/events/ListEvents";

interface Route {
    method: string,
    route: string,
    controller: any,
    action: string
}

export const Routes: Route[] = [{
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
        controller: EventList
    },
    {
        method: 'post',
        route: '/web/events',
        action: 'post',
        controller: SingleEvent
    },
    {
        method: 'get',
        route: '/web/events/:id',
        action: 'get',
        controller: SingleEvent
    },
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
    {
        method: 'get',
        controller: EventTemplate,
        action: 'get',
        route: '/dashboard/events'
    },
    {
        method: 'get',
        controller: SingleEvent,
        action: 'get',
        route: '/dashboard/events/:id'
    },
];
