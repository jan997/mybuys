import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity} from "typeorm";

import { User } from "./User";

@Entity()
export class Token extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 64
    })
    token: string;

    @Column()
    date: number;

    @ManyToOne(type => User)
    user: User
}
