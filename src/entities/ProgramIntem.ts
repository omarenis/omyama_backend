import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Contributor, ContributorModel} from "./Contributor";
import {contributorRepository} from "../repositories";

@Entity()
export class ProgramItemModel {
    @PrimaryGeneratedColumn() id: number;
    @Column() title: string;
    @Column() description: string;
    @ManyToOne(() => ContributorModel, (contributor) => contributor.programItems) contributor: ContributorModel;
    @Column({type: 'text'}) logo: string;
}

export interface ProgramItem {
    title: string;
    description: string;
    contributor: Contributor;
    logo: string;
    id ?: number;
}

export const modelConfig = {
    title: {type: 'string', required: true, unique: true},
    description: {type: 'string', required: true},
    contributor: {type: 'foreign_key', required: true, repository: contributorRepository},
    logo: {type: 'file', required: true }
}
