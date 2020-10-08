import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity, OneToOne, JoinColumn} from "typeorm";

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

    @ManyToOne(type => User, user => user.tokens)
    @JoinColumn({ name: "userId" })
    user: User;

    @Column({ nullable: false })
    userId: number;
}
  