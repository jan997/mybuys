import { error } from "console";
import React from "react";
import {Link, NavLink} from "react-router-dom";
import { PanelNavBar } from "../../../components/panel/nav/navbar";
import { AJAX } from "../../../lib/ajax";
import { TypeRest } from "../../../lib/mres";
import { SetTitle,TypeHistory, GetHistory, formatNumber } from "../../../utils/utlls";
import { Loading } from "../../../components/loading";
import { BoxCenter, BoxSize } from "../../../components/utils";
import { BUY_SEARCH, IBuySearch, IResponseBuySearch, SLEP_BUY_SEARCH } from "../../../api/buy";
import { AmountParse, ItemBuy } from "../../../components/panel/buy/item-buy";
import { SVG_ViewList } from "../../../resources/icons";
import { GetSlep } from "../../../lib/slep";
import { ScrollBotton } from "../../../lib/scrollbotton";
import { RemoteRun, RemoteUpdate } from "../../../lib/remoteupdate";
import { ListMode, STORAGE } from "../../../api/user";
import { TypeToggleButtons } from "../../../components/panel/buy/typetoggle";
import { CATEGORY_SEARCH, SLEP_CATEGORY_SEARCH } from "../../../api/category";
import InfiniteScroll from 'react-infinite-scroll-component';

type MyProps = {
};

type MyState = {  
}; 

function milFormate(value:number){
    var nf = new Intl.NumberFormat('es-ES', { maximumFractionDigits: 2  });
    return nf.format(value);
}

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
                <div>
                    <GetHistory to={h => this.history = h } />
                    <BoxCenter padding={false} size={BoxSize.Mediano} backgraund={false}>
                        <div className="row panel-navbuy">
                            <div className="col-4 inline">
                                <Link className="panel-navbuy-button viewmode mx-1" to="#" onClick={(e)=>{
                                    e.preventDefault();
                                    STORAGE.ToggleListMode();
                                    RemoteRun("remote-buylist");
                                }}>
                                    <SVG_ViewList/>
                                </Link>
                            </div>
                            <div className="col-4">
                                <RemoteUpdate sleep={true} _key="sum" content={(com)=>{
                                    const amount = `${com<0? "- ":""}$${formatNumber(com>1?com:com*-1)}`;
                                    console.log(com);
                                    return(
                                        <BoxCenter size={BoxSize.Mediano} backgraund={false} padding={false} className={`sum ${com>0?"positive":(com<0?"negative":"")}`}> 
                                            <span className="">{`${com===null?"$0":amount}`}</span> 
                                        </BoxCenter>
                                    );
                                }}/>
                            </div>
                            <div className="col-4 my-2">
                                <div className="float-right">
                                    <Link className="panel-navbuy-button refresh mx-1" to="#" onClick={(e)=>{
                                        e.preventDefault();                        
                                        GetSlep<IResponseBuySearch, IBuySearch>("slep-buylist")?.reload();
                                    }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width={24} height={24} viewBox="0 0 172 172" style={{fill: '#000000'}}><g fill="none" fillRule="nonzero" stroke="none" strokeWidth={1} strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit={10} strokeDashoffset={0} fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{mixBlendMode: 'normal'}}><path d="M0,172v-172h172v172z" fill="none" /><g className="fill"><path d="M86,17.2c-17.01998,0 -32.66383,6.21171 -44.67969,16.48333c-1.64003,1.30561 -2.43687,3.40213 -2.07805,5.46745c0.35882,2.06532 1.81609,3.77022 3.80038,4.44616c1.98429,0.67594 4.17929,0.21517 5.72428,-1.20164c10.02307,-8.56811 22.99492,-13.72865 37.23307,-13.72865c29.79361,0 54.18567,22.57745 57.05339,51.6h-16.92005l22.93333,34.4l22.93333,-34.4h-17.49114c-2.93142,-35.25049 -32.51591,-63.06667 -68.50886,-63.06667zM22.93333,57.33333l-22.93333,34.4h17.49115c2.93142,35.25049 32.51591,63.06667 68.50885,63.06667c17.01998,0 32.66383,-6.21171 44.67969,-16.48333c1.64004,-1.30561 2.43688,-3.40213 2.07807,-5.46746c-0.35882,-2.06533 -1.81609,-3.77024 -3.80039,-4.44617c-1.9843,-0.67594 -4.1793,-0.21516 -5.72429,1.20165c-10.02308,8.56811 -22.99493,13.72864 -37.23308,13.72864c-29.79361,0 -54.18567,-22.57744 -57.05339,-51.6h16.92005z" /></g></g></svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </BoxCenter>

                    <div className="my-3"/>

                    <BoxCenter  padding={false} size={BoxSize.Mediano}>
                        <div className="row p-3">
                            <div className="col-auto">
                                <button type="button" className="btn btn-success btn-crear" onClick={(e)=>{
                                    e.preventDefault();
                                    this.history?.push("/panel/add");
                                }}>
                                    Crear nuevo
                                </button>
                            </div>
                            <div className="col p-0">
                                <div className="float-right">
                                    
                                    <SLEP_CATEGORY_SEARCH task={async ()=>{return await CATEGORY_SEARCH({cound:55})}}
                                        LOADING={()=>(<>...</>)}
                                        OK={(cl)=>(
                                            <select className="form-control select-category-list" onChange={(e)=>{
                                                const id = parseInt(e.currentTarget.value);
                                                GetSlep<IResponseBuySearch, IBuySearch>("slep-buylist")?.reload({value:{category: id>0?id:undefined},value_fusion:true});
                                            }}>
                                                <option value="-1">Todos</option>
                                                {cl.categories.map((c)=>(
                                                    <option key={c.id} value={c.id}>{c.name}</option>
                                                ))}
                                            </select>
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="col-auto">
                                <TypeToggleButtons OnChahge={(t)=>{    
                                    console.log(t);                            
                                    GetSlep<IResponseBuySearch, IBuySearch>("slep-buylist")?.reload({reset:false,value:{
                                        type: t
                                    },value_fusion:true});
                                }}/>
                            </div>
                        </div>
                        <SLEP_BUY_SEARCH _key="slep-buylist" task={(setting={}) => BUY_SEARCH(Object.assign<IBuySearch,IBuySearch>(setting,{cound: 20}))} 
                            LOADING={()=> <Loading/>}
                            OK={(data,slep)=>{
                                RemoteRun("sum",data.sum)
                                return (<>
                                    <RemoteUpdate _key="remote-buylist" content={({hasMore=true}={})=>{
                                        return <>
                                        
                                            <InfiniteScroll
                                                dataLength={data.buys.length}
                                                next={async()=>{
                                                    console.log("AA");
                                                    const {buys} = await BUY_SEARCH(Object.assign<IBuySearch,IBuySearch>({skip: data.buys.length},slep.data||{}));
                                                    data.buys = data.buys.concat(buys);
                                                    RemoteRun("remote-buylist",{hasMore: buys.length===20});
                                                }}
                                                hasMore={hasMore}
                                                loader={<Loading/>}
                                                >
                                                    {data.buys.map((buy,index)=>{
                                                        return <ItemBuy desing={STORAGE.ListMode} key={buy.amount+buy.id} buy={buy} remove_me={(i)=>{
                                                            data.buys.splice(data.buys.findIndex(e=> e===i.props.buy),1);
                                                                     
                                                            GetSlep<IResponseBuySearch, IBuySearch>("slep-buylist")?.reload({reset:false});
                                                        }}/>;
                                                    })} 
                                                    {data.buys.length!==0?null:(
                                                        <div className="text-center p-3 text-black-50">
                                                            Sin elementos
                                                        </div>
                                                    )}
                                            </InfiniteScroll>
                                        </>; 
                                    }}/>
                                    {/* {data.buys.length<10?null:(
                                        <div className="p-3">
                                            <button type="button" className="btn btn-secondary btn-lg btn-block btn btn-primary" onClick={async (e)=>{
                                                    const {buys} = await BUY_SEARCH(Object.assign<IBuySearch,IBuySearch>({skip: data.buys.length},slep.data||{}));
                                                    if(buys.length>0){
                                                        data.buys = data.buys.concat(buys);
                                                        RemoteRun("remote-buylist");
                                                    }
                                            }}>Mas</button>
                                        </div>
                                    )} */}
                                        {/* <ScrollBotton show={data.buys.length===15} delay={250} event={async (s)=>{
                                            const {buys} = await BUY_SEARCH(Object.assign<IBuySearch,IBuySearch>({skip: data.buys.length},slep.data||{}));
                                            if(buys.length>0){
                                                data.buys = data.buys.concat(buys);
                                                RemoteRun("remote-buylist");
                                                s.addEvent();
                                            }else s.end();
                                        }}/> */}
                                    </>);
                            }}
                        />
                    </BoxCenter>
                </div>
            </div>
        </>);
    }
} 