import {createConnection, Repository} from "typeorm";
import { Evg } from "../app/evg";
import { Buy } from "../entity/Buy";
import { User } from "../entity/User";
import { IEvg } from "../app/evg";
import { Token } from "../entity/Token";
import { Category } from "../entity/Category";

export interface ITmg {
    Users?: Repository<User>,
    Buys?: Repository<Buy>
}


export function InitTmg(Evg:IEvg){
    return new Promise((c,e)=>{
        createConnection().then(async connection => {
            console.log(" @ Base de datos OK"); 
            console.log("");

            Evg.Tmg.Users = connection.getRepository(User);
            Evg.Tmg.Buys = connection.getRepository(Buy);
            Evg.Tmg.Tokens = connection.getRepository(Token);
            Evg.Tmg.Categories = connection.getRepository(Category);

            c();
        }).catch(error => console.log(error));
    });
};