import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Profile, ProfileModel} from "./User";
import {Event, EventModel} from "./Event";

@Entity({name: 'tickets'})
export class TicketModel
{
    @PrimaryGeneratedColumn() id: number;
    @Column({type: 'text'}) type: string;
    @Column({type: 'float'}) totalPrice: number;
    @ManyToOne(() => ProfileModel, (person) => person.tickets) person: ProfileModel;
    @ManyToOne(() => EventModel, (event: EventModel) => event.tickets) event: EventModel;
    @Column({type: 'text'}) qrCode: string;
}

export interface Ticket {
    type: string;
    totalPrice: number;
    person: Profile;
    event: Event;
    qrCode: string;
    id ?: number;
}
