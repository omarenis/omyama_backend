import {ILoginTemplate} from "./controller/auth/ILoginTemplate";
import {SignupTemplate} from "./controller/auth/SignupTemplate";
import {SpeakerRestController} from "./controller/SpeakerRestController";
import {SingleEvent} from "./controller/dashboard/events/SingleEvent";
import {EventList} from "./controller/dashboard/events/ListEvents";
import {PageListTemplate} from "./controller/dashboard/pages/PageListTemplate";
import {UsersView} from "./controller/dashboard/users/list";
import {ContactPage} from "./controller/visitor";
import {ContributorController} from "./controller/dashboard/events/ContributorConytroller";

interface Route {
    method: string,
    route: string,
    controller: any,
    action: string
}

export const Routes: Route[] = [
    {
        method: 'get',
        route: '/public/contact',
        controller: ContactPage,
        action: 'get'
    },
    {
        method: 'post',
        route: '/public/contact',
        controller: ContactPage,
        action: 'post'
    },
    {
    method: 'get',
    route: '/public/auth/login',
    controller: ILoginTemplate,
    action: 'get'
}, {
    method: 'post',
    route: '/public/auth/login',
    controller: ILoginTemplate,
    action: 'post'
},
    {
        method: 'get',
        route: '/public/auth/signup',
        controller: SignupTemplate,
        action: 'get'
    }, {
        method: 'post',
        route: '/public/auth/signup',
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
    {
        method: 'get',
        route: '/dashboard/events/:id',
        action: 'get',
        controller: SingleEvent
    },
        {
        method: 'get',
        route: '/dashboard/events/:id/contributors',
        action: 'get',
        controller: ContributorController
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
        route: '/public/events/:id',
        action: 'get',
        controller: SingleEvent
    },
    {
        method: 'get',
        controller: UsersView,
        action: 'get',
        route: '/dashboard/users'
    }
];
