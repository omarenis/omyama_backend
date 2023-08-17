import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
class PageModel
{
    @PrimaryGeneratedColumn() id: number;
    @Column({type: 'varchar', length: 255, nullable: false}) title: string;
    @Column({type: 'varchar', length: 255, nullable: false}) slug: string;
    @Column({type: 'number', nullable: false, default: 0}) order: string;
}


export interface Page
{
    title: string;
    slug: string;
    order: string;
    id ?: number;
}
