import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Event, EventModel} from "./Event";
import {ProfileModel} from "./User";

@Entity({name: 'tickets'})
export class TicketModel
{
    @PrimaryGeneratedColumn() id: number;
    @Column({type: 'text'}) type: string;
    @Column({type: 'float'}) price: number;
    @ManyToOne(() => ProfileModel, (person) => person.tickets) person: ProfileModel;
    @ManyToOne(() => EventModel, (event: EventModel) => event.tickets) event: EventModel;
    @Column({type: 'text'}) qrCode: string;
}


export class Ticket {
    constructor(public type: string, public price: number, public person) {
    }
}
