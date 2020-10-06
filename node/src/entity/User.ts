import { type } from "os";
import {Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity} from "typeorm";
import { MParse } from "../lib/mparse";
import { Buy } from "./Buy";

export type IUserSelect = ("id"|"name"|"password"|"email"|"date_of_birth"|"buys")[];

interface IUserSelects{
    BASIC: IUserSelect;
    FULL: IUserSelect;
}

const UserSelects:IUserSelects = {
    BASIC: ["id","name"],
    FULL: ["id","name", "email", "date_of_birth"],
};

export { UserSelects };

@Entity()
export class User  extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name!: string;

    @Column()
    password!: string;

    @Column({
        unique: true
    })
    email!: String;
 
    @Column()
    date_of_birth!: Number;

    @OneToMany(type => Buy, buy => buy.user)
    buys: Buy[];

    @Column()
    createAt: number;
}
