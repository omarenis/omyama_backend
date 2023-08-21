import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import EventModel, {Event} from "../Event";

@Entity()
export class PageModel {
    @PrimaryGeneratedColumn() id: number;
    @Column({type: 'varchar', length: 255, nullable: false}) title: string;
    @Column({type: 'varchar', length: 255, nullable: false}) slug: string;
    @Column({type: 'integer', nullable: false, default: 0}) order: number;
    @ManyToOne(() => EventModel, (event) => event.pages) event: EventModel;
}


export class Page {

    constructor(
        public title: string,
        public slug: string,
        public order: string,
        public id ?: number,
        public event ?: Event
    ) {
    }
}


const ModelConfig = {
    title: {type: 'string', required: true},
    slug: {type: 'slug', required: true, fieldToSlug: 'title'},
}
