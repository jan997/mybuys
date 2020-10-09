import { clearLine } from "readline";
import { IEvg } from "../app/evg";
import { BuyType } from "../entity/Buy";
import { Category } from "../entity/Category";
import { User } from "../entity/User";
import { IMParse, MParse } from "../lib/mparse";

export class MCategory{
    static filter_name:IMParse = { type: String, max: 128, min: 1 };
    static filter_color:IMParse = {type: String, min: 1, max: 10 };
    static filter_icon:IMParse = {type: String, min:1, max: 32 };
    static filter_type:IMParse = {type: String, enum: ["in", "out"] };
    static filter_public:IMParse = {type: Boolean, $default: false };
}

interface ICategoryCreate{
    name: string,
    color?:string,
    icon?: string,
    type?: BuyType,
    public?: boolean
}

const DefaultCategories:ICategoryCreate[] = [
    {name: "Comida", color: "#d48248", icon: "food", type: BuyType.Out},
    {name: "Transporte", color: "#ffc759", icon: "transport", type: BuyType.Out},
    {name: "Cine", color: "#b2f4ff", icon: "movies", type: BuyType.Out},
    {name: "Gimnasio", color: "#a8bcd8", icon: "gym", type: BuyType.Out},
    {name: "Electronica", color: "#ec8686", icon: "electronics", type: BuyType.Out},
    {name: "Colegio", color: "#bad2bc", icon: "school", type: BuyType.Out},
    {name: "Fotocopias", color: "#e6e7ed", icon: "photocopies", type: BuyType.Out},
    {name: "Teléfono", color: "#ffc9e8", icon: "teléfono", type: BuyType.Out},
    {name: "Internet", color: "#5acece", icon: "internet", type: BuyType.Out},
    {name: "Eventos", color: "#ffd86b", icon: "events", type: BuyType.Out},
    {name: "Deportes", color: "#b8e4ff", icon: "sports", type: BuyType.Out},
    {name: "Medicina", color: "#0aad78", icon: "medicine", type: BuyType.Out},
    {name: "Trabajo", color: "#54a7d0", icon: "job", type: BuyType.In},
    {name: "Amigos", color: "#4fdcb1", icon: "friends", type: BuyType.In},
    {name: "Familia", color: "#93cdff", icon: "family", type: BuyType.In},
];

export class CategoryActions{
    static async Init(Evg:IEvg){
        if( await Evg.Tmg.Categories.count() === 0){
            console.log("");
            console.log("Inicializando Categorías por defecto");
            await DefaultCategories.map(async (category)=>{
                await (await CategoryActions.Create(Evg,-1, Object.assign({public: true},category))).save();
            }); 
            console.log(" @ Categorías OK");
            console.log("");
        }
    }
    static async Create(Evg:IEvg, DUser:User|-1, raw_values: ICategoryCreate): Promise<Category>{
        if(!DUser && DUser! == -1 ) throw [500, "Necesitas ur usuario para hacer eso"];
        const values = MParse.filter<ICategoryCreate>(raw_values,{
            name: MCategory.filter_name,
            color: MCategory.filter_color, 
            icon: MCategory.filter_icon,
            public: MCategory.filter_public,
            type: MCategory.filter_type
        });

        const category = new Category();
        category.name = values.name;
        category.color = values.color;
        category.icon = values.icon;
        category.public = values.public;
        category.type = values.type;
        category.user = DUser as User;
        
        return category;
    }

    static async Search(Evg:IEvg, DUser:User){

    }
}