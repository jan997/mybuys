import { error } from "console";
import React, { FormEvent } from "react";
import {Link, NavLink, useHistory} from "react-router-dom";
import { USER_LOGIN } from "../../api/user";
import { GetHistory, SetTitle, TypeHistory } from "../../utils/utlls";

type MyProps = {
};

type MyState = {
    message_error: string|undefined,
    check: boolean,
    sleep: boolean,
    complete: boolean
};

export class ViewLogin extends React.Component<MyProps, MyState> {
    history?: TypeHistory;

    state: MyState = {
        message_error: undefined,
        check: false,
        sleep: false,
        complete: false
    };

    componentDidMount(){
        SetTitle("Iniciar sesión");
        
    }

    ImputEmail = React.createRef<HTMLInputElement>();
    ImputPassword = React.createRef<HTMLInputElement>();

    async Login(event: FormEvent<HTMLFormElement>){
        event.preventDefault();
        this.setState({sleep: true, message_error: undefined});

        const {error} = await USER_LOGIN({
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
            <div className="container view-login" >
                <GetHistory to={h => this.history = h } />
                <div className="row">
                    <div className="col-12 col-sm-9 col-lg-4 mx-auto">

                        <form className="bg-white shadow rounded py-3 px-4 " onSubmit={this.Login.bind(this)}>

                            <div>
                                <h1 className="display-5 text-center pb-4 pt-4 logo-style-1">Iniciar sesión</h1>
                            </div>

                            {!this.state.message_error?null:
                                <div className="alert alert-danger" role="alert">
                                   {this.state.message_error}
                                </div>
                            }

                            <div className=" form-group">
                                <label htmlFor="email" className="text-info">Correo electrónico</label>
                                <input autoFocus={true}
                                    ref={this.ImputEmail}
                                    id="email" 
                                    name="email" 
                                    placeholder="Escribe aquí tu e-mail..."
                                    className="form-control bg-light shadow-sm border-0 fis-invalid"
                            ></input>
                                <span className="invalid-feedback" role="alert">
                                    <strong>Necesito un e-mail</strong>
                                </span>
                            </div>

                            <div className=" form-group">
                                <label htmlFor="password" className="text-info">Contraseña</label>
                                <input 
                                    ref={this.ImputPassword}
                                    id="password" 
                                    name="password" 
                                    type="password"
                                    placeholder="Escribe aquí tu contraseña"
                                    className="form-control bg-light shadow-sm border-0 fis-invalid"
                            ></input>
                                <span className="invalid-feedback" role="alert">
                                    <strong>Necesito una contraseña</strong>
                                </span>

                            </div>
                            <div className="pb-3"></div>
                            <button className="btn btn-primary btn-lg btn-block" type={"submit"} >Iniciar sesión</button>
                            <div className="size-10 text-info mb-2 mt-3">
                                ¿No tienes una cuenta? <Link to="/register">Registrate</Link>
                                {/* <br/>
                                ¿Olvidaste tu contraseña? <Link to="/register">Restablecer</Link> */}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>);
    }
} 