import { Console } from "console";
import { IEvg } from "../app/evg";
import { Router } from "express";
import { IUserCreate, IUserLogin, MUser } from "../models/user";
import { MRest } from "../lib/MRest"
import { MParse } from "../lib/mparse";
import { UserActions } from "../models/user";
import { TokenActions } from "../models/token";

interface RouterCategorySearch{
    skip: number,
    cound: number,
    type: string,
    category: number
}

export function  RouterCategory(Evg: IEvg){
    const router = Router();

    router.get(`/api/category/search`, async (req,res)=>{
        MRest.MSHandler(req,res,async ()=>{
            const {DUser} = await TokenActions.GetUser(Evg,req,{need: true});

            const values = MParse.filter<RouterCategorySearch>(req.query,{
                skip: {type: Number, $default: 0, min: 0},
                cound: {type: Number, $default: 10, min: 1, max: 64},
                type: {type: String, enum: ["in","out"]},
                category: {type: String},
            });

            let _where_:any = {
                "userId": DUser.id
            };

            if(values.type) _where_.type = values.type;
            if(values.category) _where_.category = values.category;

            const list = await Evg.Tmg.Categories.createQueryBuilder("category")
            .where(_where_).where({"public": true})
            .orderBy({"cound": "DESC"})
            .take(values.cound)
            .skip(values.skip) 
            .getMany();


            return { categories: list, cound: list.length}
        });
    });

    return router;
}