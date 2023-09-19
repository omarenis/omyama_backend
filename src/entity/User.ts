import {Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne} from "typeorm"
import {compare, hash } from 'bcrypt';
import { TicketModel } from "./Ticket";
import {ParticipationModel} from "./Participation";

import {SECRET_KEY} from "../../appConfig";
import {EventModel} from "./Event";

@Entity({name: 'users'})
export class UserModel {

    @PrimaryGeneratedColumn() id: number;
    @Column({type: "varchar", unique: true, length: 255}) username: string;
    @Column({type: 'varchar', unique: true, length: 255}) email: string;
    @Column({type: 'boolean'}) is_superuser: boolean;
    @Column({type: 'bool'}) is_active: boolean;
    @Column({type: 'text', default: null, nullable: true}) password: string;
    @OneToOne(() => ProfileModel, (profile: ProfileModel) => profile.user, {cascade: true})
    @Column({type: 'text'}) role: string;
    profile: ProfileModel;
    async setPassword(password: string) {
        this.password =  await hash(password, SECRET_KEY);
    }

    check_password(password: string) {
        return compare(password, this.password);
    }
}

@Entity({name: 'profiles'})
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
    @OneToMany(() => EventModel, (event) => event.customer) events: EventModel[];
}

export interface User {
    role: string;
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
    user ?: number | UserModel;
    image ?: string;
    id ?: number;
}
