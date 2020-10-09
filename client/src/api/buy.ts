import React from "react";
import { Loading } from "../components/loading";
import { AJAX } from "../lib/ajax";
import { GET, TypeRest,PET, POST } from "../lib/mres";
import { SLEP } from "../lib/slep";
import { TypeProps } from "../utils/utlls";
import { ICategory } from "./category";
import { IResponse, rest_catch } from "./user";

export enum BuyType {
    In = "in",
    Out = "out"
}
export interface IBuy{
    id: number,
    concept: string,
    amount: number,
    date: number,
    userId: Number,
    type: BuyType,
    categoryId: number,
    category:ICategory
}



/**
 * BUY_SEARCH
 */
export interface IBuySearch{
    skip?: number,
    cound?: number,
    type?: string,
    category?: number
}

export interface IResponseBuySearch{
    buys: IBuy[], 
    cound: number,
    sum: number
}

export class SLEP_BUY_SEARCH extends SLEP<IResponseBuySearch, IBuySearch>{}

export async function BUY_SEARCH(filters: IBuySearch){
    const {data,error} = await PET("/api/buy/search",filters,{rest_catch: rest_catch}) as IResponse ;
    if(error) throw error;
    return data as IResponseBuySearch; 
}

/**
 * BUY_DELETE
 */
export interface IBuyDelete{
    buyId: number,
}

export interface IResponseBuyDelete{
    buy: IBuy
}

export async function BUY_DELETE(config:IBuyDelete){
    const {data,error} = await POST("/api/buy/delete",config,{rest_catch: rest_catch}) as IResponse ;
    if(error) throw error;
    return data as IResponseBuyDelete; 
}

/**
 * BUY_GET
 */
export interface IBuyGet{
    buyId: number,
}

export interface IResponseBuyGet{
    buy: IBuy
}

export async function BUY_GET(config:IBuyGet){
    const {data,error} = await PET("/api/buy/get",config,{rest_catch: rest_catch}) as IResponse ;
    if(error) throw error;
    return data as IResponseBuyGet; 
}

/**
 * BUY_CREATE
 */
export interface IBuyCreate{
    concept: string,
    amount: number,
    date: string,
    type: BuyType,
    categoryId?: number
}

export interface IResponseBuyCreate{
    buy: IBuy
}

export async function BUY_CREATE(config:IBuyCreate){
    const {data,error} = await POST("/api/buy/create",config,{rest_catch: rest_catch}) as IResponse ;
    if(error) throw error;
    return data as IResponseBuyCreate; 
}

/**
 * BUY_CREATE
 */
export interface IBuyUpdate{
    buy:{
        concept: string,
        amount: number,
        date: string, 
        categoryId?: number
    },
    buyId: Number
}

export interface IResponseBuyUpdate{
    buy: IBuy
}

export async function BUY_UPDATE(config:IBuyUpdate){
    const {data,error} = await POST("/api/buy/update",config,{rest_catch: rest_catch}) as IResponse ;
    if(error) throw error;
    return data as IResponseBuyUpdate; 
}
