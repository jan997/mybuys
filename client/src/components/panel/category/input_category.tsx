import { error } from "console";
import { ErrorMessage } from "formik";
import React from "react";
import {Link, NavLink} from "react-router-dom";
import { SLEP_CATEGORY_SEARCH, CATEGORY_SEARCH } from "../../../api/category";
import { RemoteUpdate, RemoteRun } from "../../../lib/remoteupdate";
import { Loading } from "../../loading";
import { ItemCategory } from "./item-category";

type MyProps = {
    OnChange(ic:InputCategory):void,
    value?:number;
};

type MyState = {
};

export enum M5235{
    Edit= "edit",
    Normal = "normal"
}

export class InputCategory extends React.Component<MyProps, MyState> {
    state: MyState = {

    };
    categoryId?:number;
    mode:M5235 = M5235.Normal;
    

    constructor(props:MyProps){
        super(props);
        if(props.value!==undefined) this.categoryId = props.value;
        else this.categoryId = -1;
    }

    button_editar = React.createRef<HTMLAnchorElement>();

    ClickEditar(e:React.MouseEvent<HTMLAnchorElement, MouseEvent>){
        e.preventDefault();
        this.mode = this.mode=== M5235.Normal? M5235.Edit:M5235.Normal;
        e.currentTarget.text = this.mode !== M5235.Normal? "Listo":"Editar";

        RemoteRun("category-list");
    }
    ClickBuscar(e:React.MouseEvent<HTMLAnchorElement, MouseEvent>){
    }

    render() {
        const _name = "category";
        return (<>
            <div className="InputCategory">
                <div className=" form-group">
                    <div className="row">
                        <div className="col mt-2">
                            <label htmlFor={_name} className="text-info">Categoria</label>
                        </div>
                        <div className="col-auto mt-2">
                            {/* <Link ref={this.button_editar} to="#" className="button-redondo-link mr-2" onClick={this.ClickBuscar.bind(this)}>Buscar</Link> */}
                            {/* <Link  to="#" className="button-redondo-link" onClick={this.ClickEditar.bind(this)} >Editar</Link> */}
                        </div>
                    </div>

                    <ErrorMessage name={_name} render={(error)=>(!error?null:(
                        <span className="form-error invalid-feedback" role="alert">{error}</span>
                    ))}/>
                    <SLEP_CATEGORY_SEARCH task={async ()=>{ return await CATEGORY_SEARCH({cound:50})}}
                        LOADING={()=>(<Loading/>)}
                        OK={(e)=>{ 
                            return <>
                                <RemoteUpdate _key={"category-list"} content={(data,ru)=>{
                                    return (
                                        <div className="">
                                            {this.mode===M5235.Normal?null:(
                                                <ItemCategory category={{name: "Nueva",color:"#ccc",cound:0,id:0,type:"out",createAt:232,icon:"plus",public:true,userId:-1}} active={-2===this.categoryId} select={(c)=>{
                                                    this.categoryId = -1;
                                                    RemoteRun("category-list");
                                                    this.props.OnChange(this);
                                                }}/>
                                            )}
                                            <ItemCategory category={{name: "Ninguno",color:"#ccc",cound:0,id:0,type:"out",createAt:232,icon:"none",public:true,userId:-1}} trans={true}  active={-1===this.categoryId} select={(c)=>{
                                                this.categoryId = -1;
                                                RemoteRun("category-list");
                                                this.props.OnChange(this);
                                            }}/>
                                            {e.categories.map((e)=>(
                                                <ItemCategory key={"category"+e.id} category={e} active={ e.id=== this.categoryId} mode={this.mode} select={(c)=>{
                                                    this.categoryId = c.props.category.id;
                                                    RemoteRun("category-list");
                                                    this.props.OnChange(this);
                                                }}/>
                                            ))} 
                                        </div>
                                    );
                                }}/>
                            </>;
                        }}
                    />
                </div>
            </div>
        </>);
    }
} 