import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Ticket, TicketModel} from "./Ticket";

@Entity({name: 'events'})
export class EventModel {

    @PrimaryGeneratedColumn() id: number;
    @Column({type: 'text'}) title: string;
    @Column({type: 'text'}) description: string;
    @Column({type: 'text'}) imagePath: string;
    @Column({type: 'date'}) dateStart: Date;
    @Column({type: 'date'}) dateEnd: Date;
    @OneToMany(() => TicketModel, (ticket: TicketModel) => ticket.event) tickets: TicketModel[];
    @Column({type: 'text'}) address: string;
    @Column({type: 'float'}) hosting: number;
    @Column({type: "float"}) priceConference: number;
    @Column({type: 'float'}) priceTransporting: number;
}


export class Event {
    constructor(public title: string, public description: string, public imagePath: string, public dateStart: Date,
                public dateEnd: Date, public address: string, public hosting: string, public priceConference: number,
                public priceTransporting: number, public id ?: number, public tickets ?: Ticket[]) {
    }
}
