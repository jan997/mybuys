import { error } from "console";
import React from "react";
import {Link, NavLink} from "react-router-dom";
import { SetTitle } from "../../utils/utlls";

type MyProps = {
};

type MyState = {
};

export class View404 extends React.Component<MyProps, MyState> {
    state: MyState = {

    };

    componentDidMount(){
        SetTitle("404");
    }

    render() {
        return (<>
            <div className="container view-404">

                <div className="row">
                    <div className="col-12 col-sm-5 col-lg-3 mx-auto">
                        <div className=" py-4  text-center">
                            <h1 className="display-1 logo-style-1 text-primary">404</h1>
                            <span className="text-black-50">La pagina que buscas no existe</span>
                        </div>

                        <div className="bg-white shadow rounded py-3 px-4 text-center">
                            <Link to="/">Volver</Link> - <Link to="/">Ir a Inicio</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>);
    }
} 