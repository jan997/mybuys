import { Router,Express, Application, Request, Response, Handler } from "express";
enum request_type{
    post= 2,
    get= 1
}


export class MRest{
    // router: Router
    // constructor(router:Router|Express){
    //     this.router = router;
    // }

    static debug = false;

    static Report(message:string){
        return {
            report: message
        }
    };

    static async MSHandler (req:Request,res:Response,fun){
        var time = Date.now();
        
        try {
            res.header('Content-Type' , "application/json" );
            
    
            var response = await fun(req,res);
    
            if(response === undefined) return;
            if(response === null) return;
    
            res.send({error: false, ms: Date.now() - time, data: response});
    
        } catch (error) {
            var tipo = typeof(error);
            if(tipo === "object" && error.length == 2 && typeof(error[0])== "number"){
                res.status(error[0]).send({error: error[1], ms: Date.now() - time});
                return;
            }
            if(tipo == "object"){
                if(error.message !== undefined){
                    var info:any = {error: error.message, ms: Date.now() - time};
                    if(this.debug) info.stack = error.stack;
                    res.status(500).send(info);
                    return;
                }
                res.status(500).send({error: JSON.stringify(error), ms: Date.now() - time});
                return;
            }
            if(tipo == "string"){
                res.status(500).send({error: error, ms: Date.now() - time});
                return;
            }
        }
    }; 

    async try(fun){
        try {
            return await fun();
        } catch (error) {
            return {error:{message: error[1], code: error[0]}}
        }
    }
    // post(url,fun:Application){
    //     this.router.post(url,async (req,res)=>{
    //         await this.ManagerResquest(req,res,fun,{resques_type: request_type.post});
    //     });
    // }

    // get(url,fun){
    //     this.router.get(url,async (req,res)=>{
    //         await this.ManagerResquest(req,res,fun, {resques_type: request_type.get});
    //     });
    // }
}