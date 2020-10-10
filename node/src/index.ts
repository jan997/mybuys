import "reflect-metadata";


import {Evg, InitEvg } from "./app/evg";

import { RouterUser } from "./routers/user";
import { RouterBuy } from "./routers/buy";
import { MRest } from "./lib/MRest"
import { CategoryActions } from "./models/category";
import { RouterCategory } from "./routers/category";

const DebugMode = true;

console.log(`    



       ██  █████  ███    ██  █████   █████  ███████ 
       ██ ██   ██ ████   ██ ██   ██ ██   ██      ██ 
       ██ ███████ ██ ██  ██  ██████  ██████     ██  
  ██   ██ ██   ██ ██  ██ ██      ██      ██    ██   
   █████  ██   ██ ██   ████  █████   █████     ██   
                                                  

  Name: Challenge Javascript / Alkemy         
                           
  By: José Andrés Nogales   
                           
  Debug: ${DebugMode}
                                               
`);


MRest.debug = DebugMode;

(async ()=>{
    console.log("");
    console.log("Preparando entorno");
    
    await InitEvg();    
    await CategoryActions.Init(Evg); 

    console.log("Cargando Routers");

    Evg.App.use( RouterUser(Evg) );
    console.log(" @ RouterUser OK");
    
    Evg.App.use( RouterBuy(Evg) );
    console.log(" @ RouterBuy OK");

    Evg.App.use( RouterCategory(Evg) );
    console.log(" @ RouterCategory OK");

    console.log("");

    console.log("Escuchando...");
    console.log("");
    console.log(" # http://localhost:2052/");
    // console.log("");
    // console.log(" # http://localhost:8888/");
    // console.log("");
    // console.log(" # http://localhost:8989/");
    console.log("");
    console.log("");
    // Evg.App.listen(8989);
    // Evg.App.listen(8888);
    Evg.App.listen(2052);
})();

    