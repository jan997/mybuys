import React from "react";
import { Loading } from "../components/loading";
import { AJAX } from "../lib/ajax";
import { GET, TypeRest,PET } from "../lib/mres";
import { SLEP } from "../lib/slep";
import { TypeProps } from "../utils/utlls";
import { IResponse, rest_catch } from "./user";

export interface IBuySearch{
    skip?: number,
    cound?: number,
    type?: string,
    category?: number
}

export interface IBuy{
    id?: number,
    concept: string,
    amount: number,
    date: number,
    user: Number
}

export interface IResponseBuySearch{
    buys: IBuy[], 
    cound: Number
}


export class SLEP_BUY_SEARCH extends SLEP<IResponseBuySearch>{}

export async function BUY_SEARCH(filters: IBuySearch){
    const {data,error} = await PET("/api/buy/search",filters,{rest_catch: rest_catch}) as IResponse ;
    if(error) throw error;
    return data as IResponseBuySearch; 
}