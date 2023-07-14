import {Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne} from "typeorm"
import {compare, hash } from 'bcrypt';
import { TicketModel } from "./Ticket";
import {ParticipationModel} from "./Participation";

const {SECRET_KEY} = require('../../appConfig');
@Entity({name: 'users'})
export class UserModel {

    @PrimaryGeneratedColumn() id: number;
    @Column({type: "varchar", unique: true, length: 255}) username: string;
    @Column({type: 'varchar', unique: true, length: 255}) email: string;
    @Column({type: 'boolean'}) is_superuser: boolean;
    @Column({type: 'bool'}) is_active: boolean;
    @Column({type: 'text', default: null, nullable: true}) password: string;
    @OneToOne(() => ProfileModel, (profile: ProfileModel) => profile.user, {cascade: true})
    profile: ProfileModel;
    async setPassword(password: string) {
        this.password =  await hash(password, SECRET_KEY);
    }

    check_password(password: string) {
        return compare(password, this.password);
    }
}

@Entity()
export class ProfileModel {
    @PrimaryGeneratedColumn() id: number;
    @Column({type: 'text'}) firstname: string;
    @Column({type: 'text'}) lastname: string;
    @Column({type: 'text', nullable: true}) image: string;
    @Column({type: 'float'}) gainedAmount: number;
    @Column({type: 'text'}) address: string;
    @Column({type: "text"}) phone: string;
    @OneToMany(() => TicketModel, (ticketModel: TicketModel) => ticketModel.person)
    tickets: TicketModel[];
    @OneToMany(() => ParticipationModel, (participation) => participation.organizer)
    participation_set: ParticipationModel[];
    @OneToOne(() => UserModel, (user: UserModel) => user.profile)
    user: UserModel;
}

export interface User {
    username: string;
    email: string;
    profile ?: Profile;
    password ?: string;
    id ?: number;
}

export interface  Profile {
    address: string;
    firstname: string;
    lastname: string;
    gainedAmount: number;
    phone: string;
    image ?: string;
    id ?: number;
}
