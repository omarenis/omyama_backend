import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm"
import {compare, hash } from 'bcrypt';
import {Ticket, TicketModel} from "./Ticket";
import {SECRET_KEY} from '../../appConfig';
@Entity({name: 'users'})
export class UserModel {

    @PrimaryGeneratedColumn() id: number

    @Column({type: "varchar", unique: true}) username: string

    @Column({type: 'varchar', unique: true}) email: string

    @Column({type: 'boolean'}) is_superuser: boolean


}

@Entity()
export class ProfileModel {
    @PrimaryGeneratedColumn() id: number;
    @Column({type: 'text'}) firstname: string;
    @Column({type: 'text'}) lastname: string;
    @OneToMany(() => TicketModel, (ticketModel: TicketModel) => ticketModel.person) tickets: TicketModel[];
}

export class User {
    constructor( public username: string, public email: string, public password ?: string,
                 public id ?: number) {}

    setPassword(value: string) {
        hash()
    }

    checkPassword(password: string) {
        compare();
    }
}
