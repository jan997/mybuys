import { type } from "os";
import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity, JoinColumn} from "typeorm";
import { Category } from "./Category";

import { User } from "./User";

export enum BuyType {
    In = "in",
    Out = "out"
}
export type IBuySelect = ("id"|"concept"|"amount"|"date"|"type"|"user"|"userId")[];

interface IBuySelects{
    BASIC: IBuySelect;
    SEARCH: IBuySelect;
}

const BuySelects:IBuySelects = {
    BASIC: ["id","concept","amount","type","date"],
    SEARCH: ["id","concept","amount","type","date"],
};

export { BuySelects };

@Entity()
export class Buy extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 254
    })
    concept: string;

    @Column({})
    amount: number;

    @Column({
        type: "datetime"
    })
    date: Date;

    @Column({
        type: "enum",
        enum: BuyType,
        default: BuyType.Out
    })
    type: BuyType;

    @ManyToOne(type => User, user=> user.buys,{
        cascade:true
    })
    @JoinColumn({ name: "userId" })
    user: User
    
    @Column({ nullable: false })
    userId: number;
    
    @ManyToOne(type => Category, category=> category.buys)
    @JoinColumn({ name: "categoryId" })
    category?: Category
    
    @Column({nullable: true })
    categoryId?: number;
}
