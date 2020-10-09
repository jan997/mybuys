import React from "react";
import {Link, NavLink} from "react-router-dom";
import { SVG_Logo2 } from "../../../resources/icons";
import logo from "../../../resources/vertors/logo.svg";

type MyProps = {
};

type MyState = {
};

export class NavBar extends React.Component<MyProps, MyState> {
    state: MyState = {

    };

    render() {
        return (<>
            <nav className="com-navbar navbar ">
                <Link className="navbar-brand logo-style-2" to="/">
                    <SVG_Logo2 className="app-logo" size={32}/>
                    MyBuy
                </Link>
{/* 
                    <ul className="nav mr-auto  nav-pills">
                        <li className="nav-item ">
                            <NavLink className="nav-link custon" exact={true} activeClassName='active' to="/">Inicio</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link custon" activeClassName='active' to="/about">Nosotros</NavLink>
                        </li>
                    </ul>    */}
                    <ul className="nav nav-pills">
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Iniciar sesión</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active font-weight-bold bg-primary" to="/register">Crear cuenta</Link>
                        </li>
                    </ul>
            </nav>
        </>);
    }
} 