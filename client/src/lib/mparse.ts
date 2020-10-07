


export interface IMParse{
    type: any,
    enum?: any[],
    regex?: RegExp,
    min?: number,
    max?: number,
    type_parse?: boolean,
    toLowerCase?: boolean,
    $default?: any,
    $set?: any,
    ifcase?: boolean,
    ifperm?: boolean,
    need_one?: string,
    required?: boolean
}
export interface IMParseMore{
    type?: any,
    enum?: any[],
    regex?: RegExp,
    min?: number,
    max?: number,
    type_parse?: boolean,
    toLowerCase?: boolean,
    $default?: any,
    $set?: any,
    ifcase?: boolean,
    ifperm?: boolean,
    need_one?: string,
    required?: boolean
}

export interface IMParseSetting{
    catch: boolean
}

export type MPModelAttributes<TCreationAttributes = any> = {
    [name in keyof TCreationAttributes]: IMParse;
}
  

export class MParse{
    static filter<T>(base:any, values:MPModelAttributes<any>, rare = null){
   
        var obj:any = {};
        if(rare!==null) obj = rare;
        var need_one:any = {}; 
        var need_one_keys = [];
    
        var eval_require = (key:string,setting:IMParse , obj:any)=>{
            if(obj === undefined) throw [400,`El campo '`+key+`' es requerido`];
            if(obj === null) throw [400,`El campo '`+key+`' no puede ser nulo`];
        }
        
        var eval_type = (key:String,setting:IMParse , obj:any)=>{
            if(setting.type !== undefined){
                const _type = setting.type !== Function &&  setting.type !== "type" && setting.type.name? setting.type.name.toLowerCase(): undefined;
                if(_type){
                    
                    if(setting.type === Date){
                        if(typeof(obj) === "number") obj = Date.parse(obj+"");
                        if(typeof(obj) === "string") obj = Date.parse(obj);
    
                    }

                    if(_type === "number" && typeof(obj) === "string" && obj.length > 0){
                        obj = parseInt(obj);
                        if(isNaN(obj)) throw [400,`El campo '`+key+`' es del tipo 'string' pero se necesita del tipo '`+_type+`'`];
                    }

                    if(_type !== typeof(obj)) throw [400,`El campo '`+key+`' es del tipo '`+typeof(obj)+`' pero se necesita del '`+_type+`'`];
                }
                if(setting.type_parse && obj.name) obj = obj.name.toLowerCase();

                if(setting.type === String){
                    if(obj.length === 0)throw [400,`El campo '`+key+`' necesita tener contenido`];
                    if(setting.regex && !setting.regex.exec(obj)) throw [400,`El campo '`+key+`' no es valido`];
                    if(setting.min !== undefined && obj.length < setting.min ) throw [400,`El '`+key+`' necesita minimo de `+setting.min+` caracteres`];
                    if(setting.max !== undefined && obj.length > setting.max ) throw [400,`El maximo de '`+key+`' es de `+setting.max+` caracteres`];
                }
    
                if(setting.type === Number && typeof(obj) !== "number" ) throw [400,`El campo '`+key+`' necesita tener contenido`];
                if(setting.type === Number){
                    if(setting.min !== undefined && obj < setting.min ) throw [400,`El campo '`+key+`' necesita ser mayor o igual a `+setting.min+``];
                    if(setting.max !== undefined && obj > setting.max ) throw [400,`El campo '`+key+`' necesita ser menor o igual `+setting.max+``];
                }
                //if(setting.type === Function) obj = key;
            }
            if(setting.enum !==undefined){
                var valid = false;
                for (let index = 0; index < setting.enum.length; index++) {
                    const element = setting.enum[index];
                    if(obj === element) valid = true;
                }
                if(!valid){
                    var vars = "";
                    var coma = "";
    
                    setting.enum.forEach(element => {
                        vars += coma + "'"+element+"'";
                        coma = ", ";
                    });
    
                    throw [400,key+": La variable '"+key+"' solo puede valer: "+vars+""];
                }
            }
    
            return obj;
        }
        
        for (var [key, value] of Object.entries(values)) {
            if(values[key] === undefined) continue;
    
            if(typeof(values[key]) === "object"){
                var setting = values[key];
    
                if(base[key] === undefined  && setting.$set === undefined && obj[key] === undefined && setting.$default !== undefined){
                    setting.$set = setting.$default;
                }
    
                if(base[key] !== undefined || setting.$set !== undefined ){
                    if(setting.ifcase !== undefined){
                        if(setting.ifcase !== true) continue;
                    }
                    if(setting.ifperm !== undefined){
                        if(setting.ifperm !== true) throw [401 ,"No se pudo modificar '"+key+"', permiso denegado"];
                    }
                }
    
                if(setting.need_one !== undefined){
                    if(need_one[setting.need_one] === undefined){
                        need_one[setting.need_one] = {count: 0, items: []};
                        need_one_keys.push(setting.need_one);
                    }
                    need_one[setting.need_one].items.push(key);
                }
                
    
                if(setting.$set !== undefined ){
                    setting.$set = eval_type(key,setting, setting.$set);
                    if(setting.required === true) eval_require(key,setting, setting.$set);
    
                    obj[key] = setting.$set;
    
                    if(setting.need_one !== undefined && need_one[setting.need_one] !== undefined){
                        need_one[setting.need_one].count++;
                    }
                    continue;
                }
                //setting.$copy != undefined && setting.$copy === true &&
                if(base[key] !== undefined){
                    base[key] = eval_type(key,setting, base[key]);
                    if(setting.required === true) eval_require(key,setting, base[key]);
                    obj[key] = base[key];
                    
                    if(setting.need_one !== undefined && need_one[setting.need_one] !== undefined){
                        need_one[setting.need_one].count++;
                    }
                    continue;
                }else{
                    if(setting.required === true) eval_require(key,setting, base[key]);
                }
            }
        }
    
        need_one_keys.forEach(key => {
            if(need_one[key].count === 0){
                var vars = "";
                var coma = "";
    
                need_one[key].items.forEach((element:any) => {
                    vars += coma + "'"+element+"'";
                    coma = ", ";
                });
    
                throw [400,key+": Las variables "+vars+" no pueden ser nulas al mismo tiempo"];
            }
        });
    
        return obj as T;
    };
    static more<T>(more: IMParseMore, filter: IMParse){
        return Object.assign(more,filter);
    }
    static alone(base:any, value:IMParse, setting?: IMParseSetting){
        if(setting?.catch) return {parse: this.filter<any>({default: base}, {default: value}).default};

        try {
            return {parse: this.filter<any>({default: base}, {default: value}).default};
        } catch (error) {
            return {error: error[1]};
        }
    }
}
