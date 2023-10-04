import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Contributor, ContributorModel} from "./Contributor";
import {contributorRepository} from "../repositories";

@Entity({name: 'program_items'})
export class ProgramItemModel {
    @PrimaryGeneratedColumn() id: number;
    @Column() title: string;
    @Column() description: string;
    @ManyToOne(() => ContributorModel, (contributor) => contributor.programItems) contributor: ContributorModel;
}

export interface ProgramItem {
    title: string;
    description: string;
    contributor: Contributor | number;
    id ?: number;
}

export const modelConfig = {
    title: {type: 'string', required: true, unique: true},
    description: {type: 'string', required: true},
    contributor: {type: 'foreign_key', required: true, repository: contributorRepository},
}
