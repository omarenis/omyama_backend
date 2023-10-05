import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {EventModel} from "./Event";

@Entity()
export class SettingsEventModel {
    @PrimaryGeneratedColumn() id: number;
    @Column({type: 'bool'}) withNewsletter: boolean;
    @Column({type: 'bool'}) withContact: boolean;
    @Column({type: 'text'}) aboutUsDescription: string;
    @Column({type: 'text'}) colorSite: string;
    @OneToOne(() => EventModel, (event: EventModel) => event.settings) event: EventModel;
}


export interface SettingsEvent {
    withNewsletter: boolean;
    withContact: boolean;
    aboutUsDescription: string;
    colorSite: string;
    id ?: number;
}
