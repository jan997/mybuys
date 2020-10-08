import { IEvg } from "../app/evg";
import { Token } from "../entity/Token";
import { User, UserSelects } from "../entity/User";

var cookie = require('cookie');

export class MToken{

}

export class TokenActions{
        
    static getNewToken(){
        var chars = "qwertyuiopasdfghjklzxcvbnm1234567890_-4";
        var token = "";
        for (let index = 0; index < 32; index++) {
            token += chars[parseInt(Math.random()*(chars.length-1)+"")];
        }
        return token;
    }

    static async Create(Evg: IEvg, DUser: User){
        const token = new Token();
        token.token = this.getNewToken();
        token.date = Date.now();
        token.userId = DUser.id;
        await token.save()
        return token;
    }

    static async Validate(Evg: IEvg, _token){
        const token = await Evg.Tmg.Tokens.findOne({token: _token});
        if(!token) throw [401, "Token no valido"];

        token.date = Date.now();
        await token.save();

        return token;
    }

    static async GetUser(Evg: IEvg, req, {need = true, select = UserSelects.BASIC}){
        var cookies = cookie.parse(req.headers.cookie || '');
        if(!need && cookies.token == undefined) return {login: false};

        const token = await this.Validate(Evg, cookies.token);
        const DUser = await Evg.Tmg.Users.findOne({id: token.userId}, {select: select});
        if(!User) throw [500, "No se encontro el usuario"]

        return {DUser: DUser, token: token, login: true};
    }
}