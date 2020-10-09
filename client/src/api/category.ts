
import { AJAX } from "../lib/ajax";
import { GET, TypeRest,PET, POST } from "../lib/mres";
import { SLEP } from "../lib/slep";
import { IResponse, rest_catch } from "./user";

export interface ICategory{
    id: number,
    name: string; 
    color: string;
    icon: string;
    cound: number;
    type: "out"|"in", 
    userId: number;
    public: boolean;
    createAt: number;
}

/**
 * CATEGORY_SEARCH
 */
interface ICategorySearch{
    skip?: number,
    cound?: number,
    type?: string,
    category?: number
}

export interface IResponseCategorySearch{
    categories: ICategory[], 
    cound: Number
}

export class SLEP_CATEGORY_SEARCH extends SLEP<IResponseCategorySearch, ICategorySearch>{}

export async function CATEGORY_SEARCH(filters: ICategorySearch){
    const {data,error} = await PET("/api/category/search",filters,{rest_catch: rest_catch}) as IResponse ;
    if(error) throw error;
    return data as IResponseCategorySearch; 
}
