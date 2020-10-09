import { IEvg } from "../app/evg";
import { Router } from "express";
import {  MUser } from "../models/user";
import { MRest } from "../lib/MRest"
import { MParse } from "../lib/mparse";
import { TokenActions } from "../models/token";
import { BuyActions } from "../models/buy";

interface IBuySearch{
    skip: number,
    cound: number,
    type: string,
    category: number
}

export function  RouterBuy(Evg: IEvg){
    const router = Router();

    router.post(`/api/buy/create`, async (req,res)=>{
        MRest.MSHandler(req,res,async ()=>{
            const {DUser} = await TokenActions.GetUser(Evg,req,{need: true});
            console.log(DUser);
            const mbuy = await BuyActions.Create(Evg, DUser, req.body);

            await mbuy.save();
            
            return { buy: mbuy.get()};
        });
    });

    router.post(`/api/buy/update`, async (req,res)=>{
        MRest.MSHandler(req,res,async ()=>{
            const {DUser} = await TokenActions.GetUser(Evg,req,{need: true});
            
            const values = MParse.filter<any>(req.body,{
                buyId: {type: Number, required: true},
                buy: {type: Object, required: true}
            });

            const mbuy = await BuyActions.Update(Evg, DUser,values.buyId , values.buy);
            
            await mbuy.save();
            
            return { buy: mbuy.get()};
        });
    });

    router.post(`/api/buy/delete`, async (req,res)=>{
        MRest.MSHandler(req,res,async ()=>{
            const {DUser} = await TokenActions.GetUser(Evg,req,{need: true});

            const values = MParse.filter<any>(req.body,{
                buyId: {type: Number, required: true}
            });

            const buy = await Evg.Tmg.Buys.findOne({id: values.buyId},{select: ["id","userId"]});
            if(!buy) throw [400, "El elemento no existe"];
            console.log("Buy ",buy);

            if(DUser.id !== buy.userId) throw [401, "No tienes permiso para eso"];   

            await buy.remove();
            
            return { buy: buy };
        });
    });

    router.get(`/api/buy/get`, async (req,res)=>{
        MRest.MSHandler(req,res,async ()=>{
            const {DUser} = await TokenActions.GetUser(Evg,req,{need: true});

            const values = MParse.filter<any>(req.query,{
                buyId: {type: Number, required: true}
            });

            const buy = await Evg.Tmg.Buys.findOne({id: values.buyId});
            if(!buy) throw [400, "El elemento no existe"];
            console.log("Buy ",buy);

            if(DUser.id !== buy.userId) throw [401, "No tienes permiso para eso"];   
            
            return { buy: buy };
        });
    });


    router.get(`/api/buy/search`, async (req,res)=>{
        MRest.MSHandler(req,res,async ()=>{
            const {DUser} = await TokenActions.GetUser(Evg,req,{need: true});
            const values = MParse.filter<IBuySearch>(req.query,{
                skip: {type: Number, $default: 0, min: 0},
                cound: {type: Number, $default: 10, min: 1, max: 64},
                type: {type: String, enum: ["in","out"]},
                category: {type: Number},
            });

            let _where_:any = {
                "userId": DUser.id
            };

            if(values.type) _where_.type = values.type;
            if(values.category) _where_.categoryId = values.category;

            const obj = await Evg.Tmg.Buys.query("SELECT SUM(amount) as 'sum' FROM `database`.buy WHERE userId = "+DUser.id+" ");
            
            const sum = obj[0].sum;
            
            // const list  = await Evg.Tmg.Buys.createQueryBuilder("buy")
            // .where(_where_)
            // .orderBy({"date":"DESC", "id":"DESC"})
            // .take(values.cound)
            // .skip(values.skip).getMany()

            const list = await Evg.Tmg.Buys.find({
                where: _where_,
                relations:["category"],
                order: {"date": "DESC","id":"DESC"},
                take: values.cound,
                skip: values.skip
            });
            
            return { buys: list, cound: list.length, sum:sum};
        });
    });
    
    return router;
}