import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: 'speakers'})
export class SpeakerModel {
    @PrimaryGeneratedColumn() id: number;
    @Column({type: "text"}) firstname: string;
    @Column({type: "text"}) lastname: string;
    @Column({type: "text"}) position;
    @Column({type: "text"}) description: string;
    @Column({type: "text"}) image: string;
    @Column({type: "text"}) imagePath: string;
}


export class Speaker {
    constructor(public firstname: string, public lastname: string, public position: string,
                public description: string, public image ?: string, public imagePath ?: string, public id ?: number) {
    }
}
