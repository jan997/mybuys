
import { MParse, IMParse } from "../lib/mparse";
import { IEvg } from "../app/evg";

import { User } from "../entity/User";
import { bcrypt_compare, bcrypt_hash } from "../lib/custom-bcrypt";


export interface IUserChangePassword{
    newPassword: string,
    oldPassword?: string,
}

export interface IUserCreate{
    name: string,
    password: string,
    email: string,
    date_of_birth: number
}

export interface IUserLogin{
    email: string,
    password: string
}

export class MFilters{
}

export class MUser{
    user: User;
    isNew: boolean = true;

    constructor(user?: User){
        this.isNew = user? false:true;

        if(user) this.user = user;
        else this.user = new User();
    }

    static filter_name:IMParse = { type: String, max: 254, min: 4 };
    static filter_password:IMParse = {type: String, max: 254, min: 8, regex: /^(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/ };
    static filter_email:IMParse = { type: String, max: 254, min: 6 , regex: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/ };
    static filter_date_of_birth:IMParse = {type: Number };

    async save(){
        try {
            await this.user.save();
        } catch (error) {
            console.info(error);
        }
        return this;
    }

    get(){
        return this.user;
    }

    setPassword(raw_values: IUserChangePassword){
        const values = MParse.filter<IUserChangePassword>(raw_values,{
            newPassword: MParse.more({required: true},MUser.filter_password),
            OldPassword: MUser.filter_password,
        });

        if( !this.isNew && bcrypt_compare(values.oldPassword, this.user.password)) throw [400, "Contraseña invalida"];
        
        this.user.password = bcrypt_hash(values.newPassword);

        return this;
    }

    testPassword(password:string, {cash = true}){
        const pass = MParse.alone(password, MParse.more({required: true},MUser.filter_password));
        const valid = bcrypt_compare(pass, this.user.password);
        if(cash && !valid) throw [400, "Contraseña incorrecta"];
        return valid;
    }
}
 
export class UserActions{
    static async Create(Evg:IEvg, raw_user:IUserCreate):Promise<MUser>{
        const new_user = MParse.filter<IUserCreate>(raw_user, {
            name: MParse.more({required: true},MUser.filter_name),
            password: MParse.more({required: true},MUser.filter_password),
            email: MParse.more({required: true},MUser.filter_email),
            date_of_birth: MParse.more({required: true},MUser.filter_date_of_birth)
        });

        if( await Evg.Tmg.Users.findOne({email: new_user.email}) ) throw [400, `El correo ${new_user.email} ya tiene una cuenta asociada.`];

        const muser = new MUser();
        muser.user.name = new_user.name;
        muser.user.email = new_user.email;
        muser.user.date_of_birth = new_user.date_of_birth;
        muser.setPassword({ newPassword: new_user.password });

        return muser;
    }

    static async Login(Evg:IEvg, raw_login:IUserLogin):Promise<MUser>{
        const login_user = MParse.filter<IUserCreate>(raw_login, {
            email: MParse.more({required: true},MUser.filter_email),
            password: MParse.more({required: true},MUser.filter_password)
        });

        const user = await Evg.Tmg.Users.findOne({email: login_user.email});
        if(!user) throw [401, "Correo o contraseña no validos"];

        const muser = new MUser(user);
        muser.testPassword(login_user.password,{cash: true});

        return muser;
    }
}