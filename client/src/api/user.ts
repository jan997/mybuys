import { Console } from "console";
import { lazy } from "react";
import { IMParse } from "../lib/mparse";
import { POST } from "../lib/mres";
import { RemoteRun } from "../lib/remoteupdate";

    
export function rest_catch(error:any){
    return {error: error.toString()};
}

export interface IUserCreate{
    name: string,
    password: string,
    email: string,
    date_of_birth: number 
}

export interface IUser{
    id: number,
    name: string,
    password?: string,
    email?: string,
    //date_of_birth?: number 
}

export interface IUserLogin{
    email: string,
    password: string
}

export class USER_FILTERS{
    static filter_name:IMParse = { type: String, max: 254, min: 2 };
    static filter_password:IMParse = {type: String, max: 254, min: 8, regex: /^(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/ };
    static filter_email:IMParse = { type: String, max: 254, min: 6 , regex: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/ };
    //static filter_date_of_birth:IMParse = {type: Number };
}

const STORAGE ={
    Authenticate(){
        localStorage.last_login = Date.now();
    },
    SignOut(){
        localStorage.removeItem("last_login");
    },
    FindLastLogin(){
        return localStorage.getItem("last_login")
    }
}

export {STORAGE}

class _SESION{
    private _IsLogin = false;

    private _User?: IUser;
    private _Lax?: string;

    private RESET(){
        this._IsLogin = false;
        delete this._User;
        delete this._Lax;
    }

    get isAuthenticated(){
        return this._IsLogin;
    }

    get User(){
        return this._User
    }

    get isSesion(){
        return STORAGE.FindLastLogin()?true:false;
    }

    Authenticate(User: IUser, lax:string){
        this._User = User;
        this._Lax = lax;
        this._IsLogin = true;
        STORAGE.Authenticate();
        RemoteRun("routers-sleep");
    }
    SignOut(){
        this.RESET();
        STORAGE.SignOut();
        RemoteRun("routers-sleep");
    }

    async RESTORE(){
        if(!STORAGE.FindLastLogin()) return;
        const {data,error} = await USER_VALID();
        if(data && data.login){
            SESION.Authenticate(data.user, "" );
        }else{
            if(error === "Token no valido"){
                STORAGE.SignOut();
            }
        }
    }
}

const SESION = new _SESION();

export interface IResponse<T=any>{
    data: T, 
    error: string|undefined, 
    ms:number
}

export async function USER_REGISTER(values:IUserCreate){
    const result = await POST("/api/user/register",values,{rest_catch: rest_catch}) ;
    return result as IResponse; 
}

export async function USER_LOGIN(values:IUserLogin):Promise<{error: string|undefined}>{
    const {data, error} = await POST("/api/user/login",values,{rest_catch: rest_catch});
    if(error) return {error: error};
    const {user, lax=""} = data;
    const User: IUser = {
        id: user.id,
        name: user.name
    }
    SESION.Authenticate(User, lax);
    return {error: undefined};
}

export async function USER_VALID(){
    const result = await POST("/api/user/valid",{},{rest_catch: rest_catch}) ;
    return result as IResponse<{login:boolean, user: IUser}>; 
}
export { SESION }