import { POST } from "../lib/mres";

    
export interface IUserCreate{
    name: string,
    password: string,
    email: string,
    date_of_birth: number 
}

class _SESION{
    private _login = false;

    get isAuthenticated(){
        return this._login;
    }
}

export async function USER_REGISTER(values:IUserCreate){
    const fawf = await POST("/api/user/register",values);
    return fawf; 
}

const SESION = new _SESION();

export { SESION }