import {createConnection, Repository} from "typeorm";

import express = require("express");

import {User} from "../entity/User";
import {Buy} from "../entity/Buy";
import {Token} from "../entity/Token";
import {Category} from "../entity/Category";

import { InitTmg } from "../database/db";

var path = require('path');


export interface IEvg{
    App: express.Express; 
    Tmg: ITmg
}

export interface ITmg {
    Users?: Repository<User>,
    Buys?: Repository<Buy>,
    Tokens?: Repository<Token>
    Categories?: Repository<Category>
}

const Evg:IEvg = {
    App:  express(),
    Tmg: {}
};


const InitEvg = async ()=>{
    await InitTmg(Evg);
};

Evg.App.use(express.json()); 
const __dirnode = __dirname.replace(`\\src\\app`,"");
console.log(__dirnode);
Evg.App.use(express.static(__dirnode +'/client/'));
Evg.App.get(/^(?:(?!\/api\/).)*$/, (req,res) => res.sendFile(path.join(__dirnode+'/client/index.html') ));

export {Evg, InitEvg};