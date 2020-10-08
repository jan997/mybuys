import { error } from "console";
import React from "react";
import {Link, NavLink} from "react-router-dom";
import { PanelNavBar } from "../../components/panel/nav/navbar";
import { AJAX } from "../../lib/ajax";
import { TypeRest } from "../../lib/mres";
import { SetTitle,TypeHistory, GetHistory } from "../../utils/utlls";
import { Loading } from "../loading";
import { BoxCenter } from "../utils";
import { BUY_SEARCH, IBuySearch, IResponseBuySearch, SLEP_BUY_SEARCH } from "../../api/buy";
import { ItemBuy } from "./buy/item-buy";

type MyProps = {
};

type MyState = {  
}; 


export class ViewPanelHome extends React.Component<MyProps, MyState> {
    history?: TypeHistory;
    

    state: MyState = {

    };

    componentDidMount(){
        SetTitle("Inicio");
    }
    
    render() {
        return (<>
            <div className="container view-panel-home" >
                <GetHistory to={h => this.history = h } />
                <BoxCenter>
                    fawf
                </BoxCenter>

                <div className="my-3"/>

                <BoxCenter>
                    <SLEP_BUY_SEARCH task={() => BUY_SEARCH({})} 
                        LOADING={()=> <Loading/>}
                        OK={(data)=>{
                            const buys = data.buys.map((buy,index)=>{
                                return <ItemBuy key={index} buy={buy}/>;
                            });
                            return (<>
                                {buys}
                            </>);
                        }}
                    />
                </BoxCenter>
            </div>
        </>);
    }
} 