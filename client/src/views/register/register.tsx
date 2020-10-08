import { error } from "console";
import React, { FormEvent, Ref, RefObject } from "react";
import {Link, Redirect, useHistory,} from "react-router-dom";
import { USER_FILTERS, USER_REGISTER } from "../../api/user";
import { MParse } from "../../lib/mparse";
import { RemoteRun, RemoteUpdate } from "../../lib/remoteupdate";
import { GetHistory, SetTitle, TypeHistory } from "../../utils/utlls";

type MyProps = {
};

type MyState = {
    message_error: string|undefined,
    check: boolean,
    sleep: boolean,
    complete: boolean
};


export class ViewRegister extends React.Component<MyProps, MyState> {
    history?: TypeHistory;

    ImputName = React.createRef<HTMLInputElement>();
    ImputEmail = React.createRef<HTMLInputElement>();
    ImputPassword = React.createRef<HTMLInputElement>();
    ImputRetryPassword = React.createRef<HTMLInputElement>();
    ImputCheck = React.createRef<HTMLInputElement>();

    state: MyState = {
        message_error: undefined,
        check: false,
        sleep: false,
        complete: false
    };

    componentDidMount(){
        SetTitle("Registro");
    }

    async CrearUsuario(event:FormEvent<HTMLFormElement>){
        event.preventDefault();
        this.setState({sleep: true, message_error: undefined});

        const {error} = await USER_REGISTER({
            name: this.ImputName.current?.value||"",
            date_of_birth: 21341254,
            email: this.ImputEmail.current?.value||"",
            password: this.ImputPassword.current?.value||""
        });

        if(error) this.setState({sleep: false, message_error: error});
        else {
            this.setState({complete: true});
            this.history?.push("/panel");
        }
    }


    render() {
        return (<>
            <GetHistory to={h => this.history = h}/>
            <div className="container view-register">

                <div className="row">
                    <div className="col-12 col-sm-9 col-lg-5 mx-auto">

                        <form id="form-register" className="bg-white shadow rounded py-3 pb-4 px-4 " onSubmit={this.CrearUsuario.bind(this)}>
                            <div>
                                <h1 className="display-4 text-center py-4 logo-style-1">Registro</h1>
                            </div>
                            {!this.state.message_error?(null):
                                <div className="alert alert-danger" role="alert">
                                   {this.state.message_error}
                                </div>
                            }

                            <div className=" form-group">
                                <label htmlFor="name" className="text-info">Nombre <span className="text-danger">*</span></label>
                                <input 
                                    ref={this.ImputName}
                                    required= {true}
                                    disabled={this.state.sleep}
                                    id="name" 
                                    name="name" 
                                    placeholder="Escribe aquí tu nombre..."
                                    className="form-control bg-light shadow-sm border-0" 
                                    onBlur={({currentTarget})=>{
                                        const {value, classList} = currentTarget;
                                        const {error, parse} = MParse.alone(value, USER_FILTERS.filter_name,{catch: false});
                                        if(!parse){
                                            classList.add("is-invalid");
                                            classList.remove("border-0");
                                            RemoteRun("register-form-name-error", {message: "El nombre necesita tener mas de 2 caracteres."});
                                        }else{
                                            classList.remove("is-invalid");
                                            classList.add("border-0");
                                        } 
                                    }}
                                />   
                                <RemoteUpdate _key="register-form-name-error" content={({message}={})=>(
                                    <span className="invalid-feedback" role="alert">
                                        <strong>{message}</strong>
                                    </span>
                                )}/>
                            </div>

                            <div className=" form-group">
                                <label htmlFor="email" className="text-info">Correo electrónico <span className="text-danger">*</span></label>
                                <input 
                                    ref={this.ImputEmail}
                                    required= {true}
                                    disabled={this.state.sleep}
                                    type={"email"}
                                    id="email" 
                                    name="email" 
                                    placeholder="Escribe aquí tu e-mail..."
                                    className="form-control bg-light shadow-sm border-0 fis-invalid" 
                                    onBlur={({currentTarget})=>{
                                        const {value, classList} = currentTarget;
                                        const {error, parse} = MParse.alone(value, USER_FILTERS.filter_email,{catch: false});
                                        if(!parse){
                                            classList.add("is-invalid");
                                            classList.remove("border-0");
                                            RemoteRun("register-form-email-error", {message: "El correo no es valido"});
                                        }else{
                                            classList.remove("is-invalid");
                                            classList.add("border-0");
                                        } 
                                    }}
                                />   
                                <RemoteUpdate _key="register-form-email-error" content={({message}={})=>(
                                    <span className="invalid-feedback" role="alert">
                                        <strong>{message}</strong>
                                    </span>
                                )}/>
                            </div>

                            <div className=" form-group">
                                <label htmlFor="password" className="text-info">Contraseña <span className="text-danger">*</span></label>
                                <input 
                                    ref={this.ImputPassword}
                                    required= {true}
                                    disabled={this.state.sleep}
                                    id="password" 
                                    name="password" 
                                    type="password"
                                    placeholder="Escribe aquí tu contraseña"
                                    className="form-control bg-light shadow-sm border-0 fis-invalid"
                                    onBlur={({currentTarget})=>{
                                        const {value, classList} = currentTarget;
                                        const {error, parse} = MParse.alone(value, USER_FILTERS.filter_password, {catch: false});
                                        if(!parse){
                                            classList.add("is-invalid");
                                            classList.remove("border-0");
                                            RemoteRun("register-form-password-error", {message: "La contraseña debe tener 1 letra mayúscula, 1 letra minúscula y 1 número y al menos 8 caracteres."});
                                        }else{
                                            classList.remove("is-invalid");
                                            classList.add("border-0");
                                        } 
                                    }}
                                />   
                                <RemoteUpdate _key="register-form-password-error" content={({message}={})=>(
                                    <span className="invalid-feedback" role="alert">
                                        <strong>{message}</strong>
                                    </span>
                                )}/>
                            </div>
                            <div className=" form-group">
                                <label htmlFor="retrypassword" className="text-info">Confirmar contraseña <span className="text-danger">*</span></label>
                                <input 
                                    ref={this.ImputRetryPassword}
                                    required= {true}
                                    disabled={this.state.sleep}
                                    id="retrypassword" 
                                    name="password" 
                                    type="password"
                                    placeholder="Escribe aquí tu contraseña"
                                    className="form-control bg-light shadow-sm border-0 fis-invalid"
                                    onBlur={({currentTarget})=>{
                                        const {value, classList} = currentTarget;
                                        const valido = this.ImputPassword.current?.value === this.ImputRetryPassword.current?.value;
                                        if(!valido){
                                            classList.add("is-invalid");
                                            classList.remove("border-0");
                                            RemoteRun("register-form-retrypassword-error", {message: "Las contraseñas no coinciden"});
                                        }else{
                                            classList.remove("is-invalid");
                                            classList.add("border-0");
                                        } 
                                    }}
                                />   
                                <RemoteUpdate _key="register-form-retrypassword-error" content={({message}={})=>(
                                    <span className="invalid-feedback" role="alert">
                                        <strong>{message}</strong>
                                    </span>
                                )}/>
                            </div>

                            <div className="custom-control custom-checkbox my-4">
                                <input ref={this.ImputCheck} type="checkbox" disabled={this.state.check || this.state.complete} className="custom-control-input" id="same-address" onChange={(e)=>{
                                    this.setState({check: this.ImputCheck.current?.checked||false});
                                }}/>
                                <label className="custom-control-label text-info" htmlFor="same-address">He leído y acepto los <Link to="/terms">Términos y condiciones</Link> de uso.</label>
                            </div>
                            
                            <button className="btn btn-primary btn-lg btn-block mt-4" disabled={!this.state.check || this.state.complete} type="submit" >Crear cuenta</button>
                        </form>
                    </div>
                </div>
            </div>
        </>);
    }

} 