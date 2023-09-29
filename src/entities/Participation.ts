import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Profile, ProfileModel} from "./User";

@Entity({name: 'participation'})
export class ParticipationModel {
    @PrimaryGeneratedColumn() id: number;
    @Column({type: 'date'}) date: Date;
    @Column({type: 'text'}) code: string;
    @Column({type: 'text'}) qrCode: string;
    @ManyToOne(() => ProfileModel, (organizer) => organizer.participation_set) organizer: ProfileModel;
}

export interface Participation {
    date: Date;
    code: string;
    qrCode: string;
    id?: number;
    profile: number | Profile;
}


const modelConfig = {
    date: {type: 'date', required: true},
    code: {type: 'string', required: true},
    qrCode: {type: 'file', required: true},
    profile: {type: 'foreign_key', required: true}
}
