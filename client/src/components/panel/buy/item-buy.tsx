import { error } from "console";
import React from "react";
import RMoment from "react-moment";
import Moment from "moment";
import {Link, NavLink} from "react-router-dom";
import { BUY_DELETE, IBuy } from "../../../api/buy";
import { formatNumber, SetTitle } from "../../../utils/utlls";
import { CategoryIcon } from "../category/icon";
import { SVG_Delete } from "../../../resources/icons";
import { ListMode } from "../../../api/user";
import { GetSlep } from "../../../lib/slep";
import 'moment-timezone';
import 'moment/locale/es-us';


type MyProps = {
    buy: IBuy,
    desing: ListMode,
    remove_me?(item:ItemBuy):void  
};

type MyState = {  
};

function milFormate(value:number){
    var nf = new Intl.NumberFormat('es-ES', { maximumFractionDigits: 2  });
    return nf.format(value);
}

export function AmountParse(amount:number){
    return milFormate(amount>0?amount:amount*-1);
}

export class ItemBuy extends React.Component<MyProps, MyState> {
    ROOT = React.createRef<HTMLDivElement>();
    state: MyState = {

    };

    
    async Delete(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>){
        e.preventDefault(); 
        if(await BUY_DELETE({buyId: this.props.buy.id})){
            //GetSlep("slep-buylist")?.reload({reset:true});
            this.DeleteMe();
        }
    }

    DeleteMe(){
        this.ROOT.current?.classList.add("opa0");

        setTimeout(() => {
            if(this.props.remove_me) this.props.remove_me(this);
        }, 150);
    }

    render() {
        const {buy, desing} = this.props;

        const value = formatNumber(buy.amount>0?buy.amount:buy.amount*-1) || AmountParse(buy.amount);


        if(desing === ListMode.List){
            const amount = `${buy.type === "out"? "- ":""}$${value}`;

            const date = Moment(buy.date).toLocaleString();
            return (<>
                <div ref={this.ROOT} className={`item-buy ${buy.type}`}>
                    <div className="row py-3 px-sm-1 ml-3 mr-3 no-gutters">
                        <div className="col-auto pr-3">
                            <CategoryIcon category={buy.category} type={buy.type}/>
                        </div>
                        <div className="col ">
                            <Link className="item-buy-concept" to={`/panel/edit?id=${this.props.buy.id}`}>{buy.concept}</Link>
                            <div className="item-buy-category">{buy.category?buy.category.name:"Ninguna"}</div>
                        </div>
                        <div className="col-auto text-right ">
                            <div className={`item-buy-amount `} title={value}>{amount}</div>
                            <div className={`item-buy-date `} title={date}><RMoment locale="es-us" fromNow={true}>{Moment(buy.date).toDate()}</RMoment></div>
                            
                        </div>
                    <div className="col-auto text-right delete  ml-3">
                            <Link className=" item-buy-option delete relative mx-4" style={{width: 30,height:50}} to="#" onClick={this.Delete.bind(this)}>
                                <SVG_Delete center={true} size={50} className="" style={{padding: "12px"}}/>
                            </Link>
                        </div>
                    </div>
                </div>
            </>);
        }
        if(desing === ListMode.Details){
            const amount = `${buy.type === "out"? "- ":""}$${value}`;
            const date = Moment(buy.date).toLocaleString();
            return (<>
                <div ref={this.ROOT} className={`item-buy ml-3 mr-3 small ${buy.type}`}>
                    <div className="row py-3 px-sm-1 no-gutters">
                        <div className="col-auto pr-2">
                            <CategoryIcon category={buy.category} type={buy.type}/>
                        </div>
                        <div className="col-2 sm-hidden pr-3">
                            <span className="item-buy-category">{buy.category?buy.category.name:"Ninguna"}</span>
                        </div>
                        <div className="col pr-3">
                            <span className="item-buy-concept">{buy.concept}</span> 
                        </div>
                        <div className="col-2">
                            <span className={`item-buy-date`} title={date}><RMoment locale="es-us" fromNow={true}>{buy.date}</RMoment></span>
                        </div>
                        <div className="col-2 text-right ">
                            <span className={`item-buy-amount `} title={value}>{amount}</span>
                        </div>
                        <div className="col-auto text-right delete  ml-3">
                            <Link className=" item-buy-option delete relative mx-3" style={{width: 20,height:20}} to="#" onClick={this.Delete.bind(this)}>
                                <SVG_Delete center={true} size={40} className="" style={{padding: "10px"}}/>
                            </Link>
                        </div>
                    </div>
                </div>
            </>);
        }
    }
} 
