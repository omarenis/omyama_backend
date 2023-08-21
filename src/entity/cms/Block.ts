import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class BlockModel
{
    @PrimaryGeneratedColumn() id: number;
    @Column({type: 'text'}) blockType: string;
    @Column({type: 'text'}) style: string;
    @Column({type: 'text', nullable: true, default: null}) content: string;
}


export interface Block
{
    blockType: string;
    style: string;
    content: string;
    id ?: number;
}

export interface Text extends Block {}


export interface Link
{
    style: string;
    type: string;
    href: string;
    id : number;
}
interface Card
{
    style: string;
    type: string;
    image: string;
    content: string;
    next: number | null;
    id ?: number;
}

interface Image
{
    style: string;
    alt: string;
    src: string;
}
