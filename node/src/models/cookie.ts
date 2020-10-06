import { Response } from "express";
import moment = require("moment");
import { IEvg } from "../app/evg";
import { Token } from "../entity/Token";

var cookie = require('cookie');

export class CookieActions{
    static Create(res: Response, token:Token){
        const date = new Date(parseInt(moment(Date.now()).add(6, 'M').format("x")));
        res.setHeader('Set-Cookie', cookie.serialize('token', String(token.token), {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 30 * 6,
            expires: date,
            path: "/",
            sameSite: "lax"
          }));
    }
    static Clear(res: Response){
        res.clearCookie("token", {path: '/'})
    }
}