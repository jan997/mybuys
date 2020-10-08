import { IEvg } from "../app/evg";
import { Buy, BuyType } from "../entity/Buy";
import { User } from "../entity/User";
import { IMParse, MParse } from "../lib/mparse";
import { MFilters } from "./user";

export class MBuy{
    buy: Buy;
    isNew: boolean = true;

    constructor(buy?: Buy){
        this.isNew = buy? false:true;

        if(buy) this.buy = buy;
        else this.buy = new Buy();
    } 

    static filter_concept:IMParse = { type: String, max: 512, min: 0 };
    static filter_amount:IMParse = {type: Number, min: 0 };
    static filter_date:IMParse = {type: Number };
    static filter_type:IMParse = {type: String, enum: ["in", "out"] };
    
    async save(){
        try {
            await this.buy.save();
        } catch (error) {
            console.info(error);
        }
        return this;
    }
    
    get(){
        return this.buy;
    }
}

interface IBuyCreate{
    concept: string,
    amount: number,
    date: number,
    type: BuyType
}

export class BuyActions{
    static async Create(Evg: IEvg, DUser: User, raw_values:IBuyCreate):Promise<MBuy>{
        if(!DUser) throw [500,"Se necesita un usuario para hacer eso"];

        const new_buy = MParse.filter<IBuyCreate>(raw_values,{
            concept: MParse.more({required: true},MBuy.filter_concept),
            amount:  MParse.more({required: true},MBuy.filter_amount),
            date:  MParse.more({required: true},MBuy.filter_date),
            type:  MParse.more({required: true},MBuy.filter_type)
        });

        const buy = new Buy();

        const mbuy = new MBuy(buy);

        mbuy.buy.concept = new_buy.concept;
        mbuy.buy.amount = new_buy.amount;
        mbuy.buy.date = new_buy.date;
        mbuy.buy.type = new_buy.type;
        mbuy.buy.userId = DUser.id;
        mbuy.buy.categoryId = null;

        await mbuy.save();

        return mbuy;
    }
}