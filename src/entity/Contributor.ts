import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import EventModel from "./Event";

@Entity({name: 'contributors'})
export class ContributorModel {
    @PrimaryGeneratedColumn() id: number;
    @Column({type: "text"}) firstname: string;
    @Column({type: "text"}) lastname: string;
    @Column({type: "text"}) position: string;
    @Column({type: "text"}) description: string;
    @Column({type: "text"}) image: string;
    @Column({type: 'text', nullable: true, default: null}) facebook: string;
    @Column({type: 'text', nullable: true, default: null}) google: string;
    @Column({type: 'text', nullable: true, default: null}) instagram: string;
    @Column({type: 'text', nullable: true, default: null}) otherLink: string;
    @ManyToOne(() => EventModel, (event) => event.contributors) event: EventModel;
}


export class Contributor {
    constructor(public firstname: string, public lastname: string, public position: string,
                public description: string, public image ?: string,
                public google ?: string,
                public facebook ?: string,
                public instagram ?: string,
                public otherLink ?: string,
                public id ?: number) {
    }
}


export const modelConfig = {
     firstname: {type: 'string', required: true},
     lastname: {type: 'string', required: true},
     position: {type: 'string', required: true},
     description: {type: 'string', required: true},
     image: {type: 'file', required: true},
     facebook: {type: 'string', required: true},
     google: {type: 'string', required: true},
     instagram: {type: 'string', required: true},
     otherLink: {type: 'string', required: true},
    event: {type: 'foreign_key', required: true, classMap: EventModel},
}
