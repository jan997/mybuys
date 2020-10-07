import { Console } from "console";
import { IEvg } from "../app/evg";
import { Router } from "express";
import { IUserCreate, IUserLogin, MUser } from "../models/user";
import { MRest } from "../lib/MRest"
import { MParse } from "../lib/mparse";
import { UserActions } from "../models/user";
import { TokenActions } from "../models/token";
import { CookieActions } from "../models/cookie";

export function  RouterUser(Evg: IEvg){
    const router = Router();

    router.post(`/api/user/register`, async (req,res)=>{
        MRest.MSHandler(req,res,async ()=>{
            const User = await UserActions.Create(Evg, req.body);
            
            const token = await TokenActions.Create(Evg, User.get());
            CookieActions.Create(res, token);await User.save();

            return MRest.Report("OK");
        });
    });


    router.post(`/api/user/login`, async (req,res)=>{
        MRest.MSHandler(req,res,async ()=>{
            const User = await UserActions.Login(Evg, req.body);

            const token = await TokenActions.Create(Evg, User.get());
            CookieActions.Create(res, token);

            return { user: MParse.filter(User.get(), {
                id: {type: Number},
                name: MParse.more({required: true}, MUser.filter_name),
            }) };
        });
    });


    router.post(`/api/user/valid`, async (req,res)=>{
        MRest.MSHandler(req,res,async ()=>{
            const {DUser} = await TokenActions.GetUser(Evg,req,{need: true});
            
            return { user: MParse.filter(DUser, {
                id: {type: Number},
                name: MParse.more({required: true},MUser.filter_name),
            }), login: true};
        });
    });

    router.post(`/api/user/logout`, async (req,res)=>{
        MRest.MSHandler(req,res,async ()=>{
            const {DUser, token} = await TokenActions.GetUser(Evg,req,{need: true});
            
            await token.remove();
            CookieActions.Clear(res);

            return { user: MParse.filter(DUser, {
                name: MParse.more({required: true},MUser.filter_name),
            }), logout: true};
        });
    });

    return router;
}