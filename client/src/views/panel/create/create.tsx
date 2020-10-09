import { error } from "console";
import React from "react";
import {Link, NavLink, Redirect} from "react-router-dom";
import { PanelNavBar } from "../../../components/panel/nav/navbar";
import { AJAX } from "../../../lib/ajax";
import { TypeRest } from "../../../lib/mres";
import { SetTitle,TypeHistory, GetHistory, useQuery, GetQuery } from "../../../utils/utlls";
import { Loading } from "../../../components/loading";
import { BoxCenter, BoxSize } from "../../../components/utils";
import { BuyType, BUY_CREATE, BUY_GET, BUY_SEARCH, IBuy, IBuyCreate, IBuyGet, IBuySearch, IResponseBuySearch, SLEP_BUY_SEARCH } from "../../../api/buy";
import { ItemBuy } from "../../../components/panel/buy/item-buy";
import { SVG_ViewList } from "../../../resources/icons";
import { GetSlep, SLEP } from "../../../lib/slep";
import { RemoteRun, RemoteUpdate } from "../../../lib/remoteupdate";
import { ListMode, STORAGE } from "../../../api/user";
import moment from "moment";

import {
    Formik,
    FormikHelpers,
    FormikProps,
    Form,
    Field,
    FieldProps, ErrorMessage
  } from 'formik';
import * as yup from 'yup';
import Moment from "react-moment";
import { CATEGORY_SEARCH, SLEP_CATEGORY_SEARCH } from "../../../api/category";
import { ItemCategory } from "../../../components/panel/category/item-category";
import { InputCategory } from "../../../components/panel/category/input_category";
import { IResponseBuyGet } from "../../../api/buy";
import { BUY_UPDATE } from "../../../api/buy";

export enum CreateMode{
    Edit,
    Create
};

type MyProps = {
    mode?: CreateMode
};

type MyState = {  
}; 
interface I4252{
    InitialValues: IBuyCreate,
    Mode: CreateMode,
    buyId?: Number
}
export class SLEP_BUY_GET2 extends SLEP<I4252, any>{}


export class ViewPanelCreate extends React.Component<MyProps, MyState> {
    history?: TypeHistory;
    query?: URLSearchParams;

    state: MyState = {
    };

    componentDidMount(){
        SetTitle(this.props.mode === CreateMode.Create?"Nuevo":"Editar");
    }
    
    render() {
        return (<>
            <GetHistory to={h => this.history = h } />
            {/* <GetQuery to={h => this.query = h } /> */}
            <SLEP_BUY_GET2 task={async ()=>{
                const query = useQuery(this.history?.location);
                if(query.get("id")){
                    const {buy} = await BUY_GET({buyId: parseInt(query.get("id")||"-1")});

                    const initialValues: IBuyCreate = {
                         concept: buy.concept,
                         amount: buy.amount,
                         date: moment(moment(buy.date).toDate()).format("YYYY-MM-DDTHH:mm"),
                         categoryId: buy.categoryId,
                         type: buy.type
                    };

                    return {InitialValues:initialValues, Mode: CreateMode.Edit, buyId:buy.id};
                }else{
                    const initialValues: IBuyCreate = {
                         concept: 'General',
                         amount: STORAGE.ValueOld,
                         date: moment(Date.now()).format("YYYY-MM-DDTHH:mm"),
                         type: BuyType.Out,
                    };
                    
                    return {InitialValues:initialValues, Mode: CreateMode.Create};
                }
            }} 
            
            ERR={(error)=>(
                <>  
                    <Redirect to="/panel"/>
                </>
            )}
            
            OK={({InitialValues, Mode, buyId})=>{
                return <>




                <div className="container view-panel-create" >
                    {/* <div className="text-center">
                        <h2>Crear nuevo</h2>
                    </div> */}
                    <BoxCenter padding={false} size={BoxSize.Mediano}>
                            <Formik
                                initialValues={InitialValues}
                                validationSchema={yup.object({
                                    concept: yup.string().max(32, "Demaciado largo").required("Se necesita una descripción"),
                                    amount:yup.number().notOneOf([0],"No puede ser cero").required("No hay Valor"),
                                    date: yup.date().required()
                                }).defined()}
                                onSubmit={async (values, actions) => {
                                    RemoteRun("alert-error",false,"");
                                    actions.setSubmitting(false);
                                    (global as any).mome = moment;
                                    if(Mode === CreateMode.Create){
                                        try {
                                            const {buy} = await BUY_CREATE({
                                                concept: values.concept,
                                                amount: values.amount,
                                                date: values.date,
                                                type: values.amount>0?BuyType.In:BuyType.Out,
                                                categoryId: values.categoryId
                                            });
    
                                            if(buy){
                                                STORAGE.SetValueOld(values.amount);
                                                this.history?.push("/panel");
                                            }
                                        } catch (error) {
                                            RemoteRun("alert-error",true,error);
                                        }
                                    }else{
                                        try {
                                            const {buy} = await BUY_UPDATE({
                                                buy:{
                                                    concept: values.concept,
                                                    amount: values.amount,
                                                    date: values.date,
                                                    categoryId: values.categoryId?values.categoryId:undefined, 
                                                },
                                                buyId: buyId||-1
                                            });
                                            if(buy){
                                                STORAGE.SetValueOld(values.amount);
                                                this.history?.push("/panel");
                                            }
                                        } catch (error) {
                                            RemoteRun("alert-error",true,error);
                                        }
                                    }
                                }}
                            >
                            {formik => (
                                <Form >
                                    <div className="row p-3">
                                        <div className="col">
                                            <button type="button" className="btn btn-outline-secondary" onClick={(e)=>{
                                                e.preventDefault();
                                                this.history?.push("/panel");
                                            }}>Cancelar</button>
                                        </div>
                                            <div className="col-auto">
                                                <button className="btn btn-success" type="submit" disabled={formik.isSubmitting}>{Mode===CreateMode.Create?"Crear nuevo":"Guardar"}</button>
                                            </div>
                                    </div>
                                    <div className="bg-white shadow rounded py-3 px-4 ">
                                            <RemoteUpdate _key="alert-error" content={(show=false,message_error="")=>(<>
                                                {!show?null:(
                                                    <div className="alert alert-danger" role="alert">
                                                        {message_error}
                                                    </div>
                                                )}
                                            </>)}/>
                                            <div className="form-row">
                                                <div className="col-8">
                                                    {(({_name="concept"}={})=>(
                                                        <div className=" form-group">
                                                            <label htmlFor={_name} className="text-info">Descripción</label>
                                                            <Field autoFocus={true}
                                                                id={_name} 
                                                                name={_name} 
                                                                placeholder="..."
                                                                className={`form-control bg-light shadow-sm border-0 ${formik.errors.concept && formik.touched.concept?"is-invalid":""}`}
                                                            ></Field>
                                                            <ErrorMessage name={_name} render={(error)=>(!error?null:(
                                                                <span className="form-error invalid-feedback" role="alert">{error}</span>
                                                            ))}/>
                                                        </div>
                                                    ))()}
                                                </div>
                                                <div className="col-4">
                                                    {(({_name="amount"}={})=>(
                                                        <div className=" form-group">
                                                            <label htmlFor={_name} className="text-info">Valor</label>
                                                            <Field 
                                                                id={_name} 
                                                                name={_name} 
                                                                type=""
                                                                placeholder="Valor"
                                                                step="any"
                                                                className={`form-control bg-light shadow-sm border-0 ${formik.errors.amount && formik.touched.amount?"is-invalid":""}`}
                                                            ></Field>
                                                            <ErrorMessage name={_name} render={(error)=>(!error?null:(
                                                                <span className="form-error invalid-feedback" role="alert">{error}</span>
                                                            ))}/>
                                                        </div>
                                                    ))()}
                                                </div>
                                            </div>
                                            {(({_name="date"}={})=>(
                                                <div className=" form-group">
                                                    <label htmlFor={_name} className="text-info">Fecha</label>
                                                    <Field 
                                                        id={_name} 
                                                        name={_name}  
                                                        type="datetime-local"
                                                        className={`form-control bg-light shadow-sm border-0 ${formik.errors.date?"is-invalid":""}`}
                                                    ></Field>
                                                    <ErrorMessage name={_name} render={(error)=>(!error?null:(
                                                        <span className="form-error invalid-feedback" role="alert">{error}</span>
                                                    ))}/>
                                                </div>
                                            ))()}
                                            {console.log(formik.values)}
                                            <InputCategory OnChange={(ic)=>{formik.values.categoryId = ic.categoryId}} value={formik.values.categoryId}/>
                                    </div>


                                    {/* <button className="btn btn-primary btn-lg btn-block" type={"submit"} >Iniciar sesión</button>
                                    <button type="submit">Submit</button>  */}
                                </Form>)
                                }
                        </Formik>
                        
                    </BoxCenter>
                </div>








                </>;
            }}
            
            />

        </>);
    }
} 