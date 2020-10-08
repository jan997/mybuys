import { error } from "console";
import React from "react";
import {Link, NavLink} from "react-router-dom";
import { IBuy } from "../../../api/buy";
import { SetTitle } from "../../../utils/utlls";
import  "./item-buy.scss";

type MyProps = {
    buy: IBuy
};

type MyState = {  
};

export class ItemBuy extends React.Component<MyProps, MyState> {
    state: MyState = {

    };

    componentDidMount(){
        SetTitle("Inicio");
    }
    
    render() {
        return (<>
            <div className="container item-buy">

                <div className="row">
                    <div className="col-4 d-flex justify-content-center">
                        <h3 className="">Home</h3>
                    </div>
                </div>
            </div>
        </>);
    }
} 