import { IEvg } from "../app/evg";
import { Buy, BuyType } from "../entity/Buy";
import { User } from "../entity/User";
import { IMParse, MParse } from "../lib/mparse";
import { MFilters } from "./user";
import moment = require("moment");

export class MBuy{
    buy: Buy;
    isNew: boolean = true;

    constructor(buy?: Buy){
        this.isNew = buy? false:true;

        if(buy) this.buy = buy;
        else this.buy = new Buy();
    } 

    static filter_concept:IMParse = { type: String, max: 512, min: 0 };
    static filter_amount:IMParse = {type: Number };
    static filter_date:IMParse = {type: String };
    static filter_type:IMParse = {type: String, enum: ["in", "out"] };
    static filter_categoryId:IMParse = {type: Number, min: -1 };
    
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
    
    SimpleValid(DUser:User){
        if(DUser.id !== this.buy.userId) throw [401, "No tienes permiso para eso"];   
    }

    setAmount(value:number){
        if(this.buy.type === BuyType.Out && value > 0) throw [401, "Valor debe ser menor que 0"]; 
        if(this.buy.type === BuyType.In && value < 0) throw [401, "Valor debe ser mayor que 0"]; 
        this.buy.amount = value;
    }

    setCategory(id:number|undefined){
        if(id!=undefined){
            if(id===-1) this.buy.category = undefined;
            else this.buy.categoryId = id;
        }
    }
}

interface IBuyCreate{
    concept: string,
    amount: number,
    date: Date,
    type: BuyType,
    categoryId?: number
}


interface IBuyEdit{
    concept: string,
    amount: number,
    date: Date,
    categoryId?: number
}


export class BuyActions{
    static async Create(Evg: IEvg, DUser: User, raw_values:IBuyCreate):Promise<MBuy>{
        if(!DUser) throw [500,"Se necesita un usuario para hacer eso"];

        const new_buy = MParse.filter<IBuyCreate>(raw_values,{
            concept: MParse.more({required: true},MBuy.filter_concept),
            amount:  MParse.more({required: true},MBuy.filter_amount),
            date:  MParse.more({required: true},MBuy.filter_date),
            type:  MParse.more({required: true},MBuy.filter_type),
            categoryId:  MParse.more({required: false},MBuy.filter_categoryId)
        });

        const buy = new Buy();


        const mbuy = new MBuy(buy);

        mbuy.buy.concept = new_buy.concept;
        mbuy.setAmount(new_buy.amount)
        mbuy.buy.date = new_buy.date;
        mbuy.buy.type = new_buy.type;
        mbuy.buy.userId = DUser.id;
        mbuy.setCategory(new_buy.categoryId);

        await mbuy.save();

        return mbuy;
    }
    static async Update(evg: IEvg, DUser, buyId, raw_values: IBuyEdit){
        const edit_buy = MParse.filter<IBuyEdit>(raw_values,{
            concept: MParse.more({required: true},MBuy.filter_concept),
            amount:  MParse.more({required: true},MBuy.filter_amount),
            date:  MParse.more({required: true},MBuy.filter_date),
            categoryId:  MParse.more({required: false}, MBuy.filter_categoryId)
        });

        const buy = await evg.Tmg.Buys.findOne({id: buyId});
        const mbuy = new MBuy(buy);

        mbuy.SimpleValid(DUser);

        mbuy.buy.concept = edit_buy.concept;
        mbuy.setAmount(edit_buy.amount);
        mbuy.buy.date = edit_buy.date;
        mbuy.buy.userId = DUser.id;
        mbuy.buy.categoryId = edit_buy.categoryId;

        await mbuy.save();

        return mbuy;
    }
}