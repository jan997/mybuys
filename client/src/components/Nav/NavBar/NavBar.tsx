import React from "react";
import {Link, NavLink} from "react-router-dom";
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
            <nav className="com-navbar navbar navbar-expand-lg">
                <Link className="navbar-brand logo-style-2" to="/">
                    <img src={logo} className="App-logo" alt="logo" />
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