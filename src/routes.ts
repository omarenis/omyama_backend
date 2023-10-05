import { ILoginTemplateInstance } from "./controller/auth/ILoginTemplate";
import { SignUpTemplateInstance } from "./controller/auth/SignupTemplate";
import {SingleEvent} from "./controller/dashboard/events/SingleEvent";
import {EventList} from "./controller/dashboard/events/ListEvents";
import {PageListTemplate} from "./controller/dashboard/events/pages/PageListTemplate";
import {UsersView} from "./controller/dashboard/users/list";
import {contributorPublicController} from "./controller/visitor";
import {ContributorController} from "./controller/dashboard/events/ContributorController";
import ProgramController from "./controller/dashboard/events/ProgramController";

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

    // program crud
    {
        method: 'get',
        route: '/dashboard/events/:id/program',
        action: 'get',
        controller: ProgramController
    },
    {
        method: 'post',
        route: '/dashboard/events/:eventId/program/create',
        action: 'post',
        controller: ProgramController
    },
    {
        method: 'put',
        route: '/dashboard/events/:eventId/program/:id',
        action: 'put',
        controller: ProgramController
    },
    {
        method: 'delete',
        route: '/dashboard/events/:eventId/program/:id',
        action: 'delete',
        controller: ProgramController
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


    // public epages for event
    {
        method: 'get',
        route: '/public/events/:slug',
        action: 'get',
        controller: SingleEvent
    },
    {
        method: 'get',
        action: 'get',
        route: '/public/events/:eventSlug/speakers/:fullName',
        controller: contributorPublicController
    },
    {
        method: 'get',
        controller: UsersView,
        action: 'get',
        route: '/dashboard/users'
    }
];
