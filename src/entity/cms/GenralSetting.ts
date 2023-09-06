import {Column, Entity } from "typeorm";

@Entity()
class GeneralSettingModel {
    @Column() hasNewsletter: boolean;
}
