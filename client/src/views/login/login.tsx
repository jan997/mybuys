import { error } from "console";
import React from "react";
import {Link, NavLink} from "react-router-dom";
import { SetTitle } from "../../utils/utlls";

type MyProps = {
};

type MyState = {
};

export class ViewLogin extends React.Component<MyProps, MyState> {
    state: MyState = {

    };

    componentDidMount(){
        SetTitle("Iniciar sesión");
    }

    render() {
        return (<>
            <div className="container view-login" >

                <div className="row">
                    <div className="col-12 col-sm-9 col-lg-4 mx-auto">

                        <form className="bg-white shadow rounded py-3 px-4 ">

                            <div>
                                <h1 className="display-5 text-center pb-4 pt-4 logo-style-1">Iniciar sesión</h1>
                            </div>
                            <div className=" form-group">
                                <label htmlFor="email" className="text-info">Correo electrónico</label>
                                <input autoFocus={true}
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
                            <button className="btn btn-primary btn-lg btn-block">Iniciar sesión</button>
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