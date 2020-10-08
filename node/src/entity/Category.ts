import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Buy, BuyType } from "./Buy";
import { User } from "./User";

export enum CategoryType {
    In = "in",
    Out = "out"
}

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
        enum: CategoryType,
        default: CategoryType.Out
    })
    type: BuyType; 

    @Column()
    createAt: number;

    @OneToMany(type => Buy, buy => buy.category)
    buys?: Buy[];

}