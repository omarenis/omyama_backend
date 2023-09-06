import {Column, Entity} from "typeorm";

@Entity()
class  HeaderSettingModel {
    @Column({type: 'varchar', length: 9, nullable: false}) colorHeader: string;
}
