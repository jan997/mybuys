import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { BuyType } from "./Buy";
import { User } from "./User";

@Entity()
export class Category extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 128,
        nullable: false
    })
    name: string; 

    @Column({
        length: 10
    })
    color: string;

    @Column({length: 32})
    icon: string;
    
    @Column({default: 0})
    cound: number;
    
    @ManyToOne(type => User, user=> user.buys)
    @JoinColumn({ name: "userId" })
    user: User
    
    @Column({ nullable: true })
    userId: number;

    @Column({default: false})
    public: boolean;
    
    @Column({
        type: "enum",
        enum: BuyType,
        default: BuyType.Out
    })
    type: BuyType;

    @Column()
    createAt: number;
}