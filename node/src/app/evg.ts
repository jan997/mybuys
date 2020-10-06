import {createConnection, Repository} from "typeorm";

import express = require("express");

import {User} from "../entity/User";
import {Buy} from "../entity/Buy";
import {Token} from "../entity/Token";
import {Category} from "../entity/Category";

import { InitTmg } from "../database/db";



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

export {Evg, InitEvg};