import "reflect-metadata";
import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Ticket, TicketModel} from "./Ticket";
import {ProfileModel} from "./User";
import {PageModel} from "./cms/Page";
import {Contributor, ContributorModel} from "./Contributor";

@Entity({name: 'events'})
export default class EventModel {

    @PrimaryGeneratedColumn() id: number;
    @Column({type: 'text'}) title: string;
    @Column({type: 'text'}) description: string;
    @Column({type: 'text'}) imagePath: string;
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
    constructor(public title: string, public description: string, public imagePath: string, public dateStart: Date,
                public dateEnd: Date, public address: string, public hosting: string, public priceHosting: number,
                public priceTransporting: number, public isOnline: boolean, public url: string, public id ?: number,
                public tickets ?: Ticket[],
                public contributors ?: Contributor[]) {
    }
}
