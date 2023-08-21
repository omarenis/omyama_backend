import {ILoginTemplate} from "./controller/auth/ILoginTemplate";
import {SignupTemplate} from "./controller/auth/SignupTemplate";
import {SpeakerRestController} from "./controller/SpeakerRestController";
import {SingleEvent} from "./controller/dashboard/events/SingleEvent";
import {EventList} from "./controller/dashboard/events/ListEvents";
import {PageListTemplate} from "./controller/dashboard/pages/PageListTemplate";

interface Route {
    method: string,
    route: string,
    controller: any,
    action: string
}

export const Routes: Route[] = [{
    method: 'get',
    route: '/web/auth/login',
    controller: ILoginTemplate,
    action: 'get'
}, {
    method: 'post',
    route: '/web/auth/login',
    controller: ILoginTemplate,
    action: 'post'
},
    {
        method: 'get',
        route: '/web/auth/signup',
        controller: SignupTemplate,
        action: 'get'
    }, {
        method: 'post',
        route: '/web/auth/signup',
        controller: SignupTemplate,
        action: 'post'
    },
    // the events crud
    {
        method: 'get',
        route: '/dashboard/events',
        action: 'get',
        controller: EventList
    },
    {
        method: 'post',
        route: '/dashboard/events/:id',
        action: 'post',
        controller: SingleEvent
    },
    // the pages crud
    {
        method: 'get',
        route: '/dashboard/events/pages',
        action: 'get',
        controller: PageListTemplate
    },
    {
        method: 'post',
        route: '/dashboard/events/:id',
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
    }
];
