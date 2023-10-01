import { ILoginTemplateInstance } from "./controller/auth/ILoginTemplate";
import { SignUpTemplateInstance } from "./controller/auth/SignupTemplate";
import {SingleEvent} from "./controller/dashboard/events/SingleEvent";
import {EventList} from "./controller/dashboard/events/ListEvents";
import {PageListTemplate} from "./controller/dashboard/pages/PageListTemplate";
import {UsersView} from "./controller/dashboard/users/list";
import {ContactPage} from "./controller/visitor";
import {ContributorController} from "./controller/dashboard/events/ContributorController";

interface Route {
    method: string,
    route: string,
    controller: any,
    action: string,
    roleUserToAccess?: string
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
        controller: ILoginTemplateInstance,
        action: 'get'
    }, {
        method: 'post',
        route: '/public/auth/login',
        controller: ILoginTemplateInstance,
        action: 'post'
    },
    {
        method: 'get',
        route: '/public/auth/signup',
        controller: SignUpTemplateInstance,
        action: 'get'
    }, {
        method: 'post',
        route: '/public/auth/signup',
        controller: SignUpTemplateInstance,
        action: 'post'
    },
    // the events crud
    {
        method: 'get',
        route: '/dashboard/events',
        action: 'get',
        controller: EventList,
        roleUserToAccess: 'customer'
    },
    {
        method: 'get',
        route: '/dashboard/events/:id',
        action: 'get',
        controller: SingleEvent,
        roleUserToAccess: 'customer'
    },
    {
        method: 'post',
        route: '/dashboard/events/:id',
        action: 'post',
        controller: SingleEvent,
        roleUserToAccess: 'customer'
    },
    {
        method: 'get',
        route: '/dashboard/events/:id',
        action: 'get',
        controller: SingleEvent,
        roleUserToAccess: 'customer'
    },
    // contributors crud
    {
        method: 'get',
        route: '/dashboard/events/:id/contributors',
        action: 'get',
        controller: ContributorController
    },
    {
        method: 'post',
        route: '/dashboard/events/:id/contributors',
        action: 'post',
        controller: ContributorController
    },
    {
        method: 'put',
        route: '/dashboard/events/:id/contributors',
        action: 'put',
        controller: ContributorController
    },
    {
        method: 'delete',
        route: '/dashboard/events/:id/contributors',
        action: 'post',
        controller: ContributorController
    },

    // pricing crud
    {
        method: 'get',
        route: '/dashboard/events/:eventId/contributors',
        action: 'get',
        controller: ContributorController
    },
    {
        method: 'post',
        route: '/dashboard/events/:eventId/contributors/create',
        action: 'post',
        controller: ContributorController
    },
    {
        method: 'put',
        route: '/dashboard/events/:eventId/contributors',
        action: 'put',
        controller: ContributorController
    },
    {
        method: 'delete',
        route: '/dashboard/events/:id/contributors',
        action: 'post',
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
