import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {EventModel} from "./Event";
import {ProgramItemModel} from "./ProgramIntem";

@Entity({name: 'contributors'})
export class ContributorModel {
    @PrimaryGeneratedColumn() id: number;
    @Column({type: "text"}) fullName: string;
    @Column({type: "text", nullable: true}) position: string;
    @Column({type: "text"}) contribution: string;
    @Column({type: "text", nullable: true}) company: string;
    @Column({type: "text"}) description: string;
    @Column({type: "text"}) image: string;
    @Column({type: 'text', nullable: true, default: null}) facebook: string;
    @Column({type: 'text', nullable: true, default: null}) google: string;
    @Column({type: 'text', nullable: true, default: null}) linkedin: string;
    @ManyToOne(() => EventModel, (event) => event.contributors) event: EventModel;
    @OneToMany(() => ProgramItemModel, (programItem) => programItem.contributor) programItems: ProgramItemModel[];
}


export class Contributor {
    constructor(public fullName: string,
                public position: string,
                public description: string,
                public image: string,
                public contribution: string,
                public company: string | undefined,
                public event: number | EventModel,
                public google ?: string,
                public facebook ?: string,
                public linkedin ?: string,
                public id ?: number ) {
    }
}


export const modelConfig = {
    fullName: {type: 'string', required: true},
    position: {type: 'string', required: false},
    description: {type: 'string', required: true},
    contribution: {type: 'string', required: true},
    company: {type: 'string', required: false},
    image: {type: 'blob', required: true},
    facebook: {type: 'string', required: true},
    google: {type: 'string', required: false},
    linkedin: {type: 'string', required: false},
}
