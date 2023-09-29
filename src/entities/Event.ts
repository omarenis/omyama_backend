import "reflect-metadata";
import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Ticket, TicketModel} from "./Ticket";
import {Profile, ProfileModel} from "./User";
import {PageModel} from "./cms/Page";
import {Contributor, ContributorModel} from "./Contributor";
import { UploadedFile } from "express-fileupload";

@Entity({name: 'events'})
export class EventModel {
    @PrimaryGeneratedColumn() id: number;
    @Column({type: 'text'}) title: string;
    @Column({type: 'text'}) description: string;
    @Column({type: 'text'}) image: string;
    @Column({type: 'date'}) dateStart: Date;
    @Column({type: 'date'}) dateEnd: Date;
    @Column({type: 'text', nullable: true}) url: string;
    @OneToMany(() => TicketModel, (ticket: TicketModel) => ticket.event) tickets: TicketModel[];
    @Column({type: "bool", nullable: false, default: true}) isOnline: boolean;
    @Column({type: 'text'}) address: string;
    @Column({type: 'text', nullable: true }) hosting: string;
    @Column({type: "float"}) priceHosting: number;
    @Column({type: 'float', nullable: true, default: null}) priceTransporting: number;
    @ManyToOne(() => ProfileModel, (customer) => customer.events) customer: ProfileModel;
    @OneToMany(() => PageModel, (page: PageModel) => page.event) pages: PageModel;
    @OneToMany(() => ContributorModel, (contributor) => contributor.event) contributors: ContributorModel[];
}

export class Event {
    constructor(public title: string, public description: string, public image: string | UploadedFile | UploadedFile[], public dateStart: Date,
                public dateEnd: Date, public address: string, public hosting: string, public priceHosting: number,
                public priceTransporting: number, public isOnline: boolean, public url: string, public customer: Profile, public id ?: number,
                public tickets ?: Ticket[],
                public contributors ?: Contributor[]) {
    }
}


export const modelConfig = {
    title: {type: 'text', unique: true, required: true},
    description: {type: 'text', unique: false, required: true},
    image: {type: 'blob', required: true},
    dateStart: {type: 'date', required: true},
    dateEnd: {type: 'date', required: true},
    url: {type: 'text', required: true},
    isOnline: {type: 'boolean', required: true},
    address: {type: 'string', required: false },
    hosting: {type: 'string', required: false },
    priceHosting: {type: 'float', required: true },
    priceTransporting: {type: 'float', required: true},
    customer: {type: "foreign_key", required: true, classMap: () => ProfileModel}
}
