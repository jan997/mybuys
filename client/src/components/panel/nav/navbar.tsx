import { Session } from "inspector";
import React from "react";
import NavDropdown from "react-bootstrap/esm/NavDropdown";
import {Link, NavLink} from "react-router-dom";
import { SESION, USER_FILTERS } from "../../../api/user";
import logo from "../../../resources/vertors/logo.svg";
import { TypeProps } from "../../../utils/utlls";
import { SVG_Salir,SVG_Logo2 } from "../../../resources/icons";

type MyProps = {
};

type MyState = {
};

export class PanelNavBar extends React.Component<MyProps, MyState> {
    state: MyState = {

    };


    // NLink(props:{
    //     click(event:React.MouseEvent<HTMLAnchorElement, MouseEvent>): void,
    //     text: string| JSX.Element,
    //     _this: PanelNavBar,
    //     className?: string,
    //     disabled?: boolean
    // } & TypeProps){
    //     if(props.disabled){
    //         return (<>
    //             <div className={`dropdown-item nlink ${props.className||""}`}>
    //                 {props.text}
    //             </div>
    //         </>);
    //     }
    //     return (
    //         <Link className={`dropdown-item nlink nav-link ${props.className||""}`} to="#" onClick={(e)=>{
    //             props._this.MenuClose();
    //             props.click(e);
    //         }}>
    //             {props.text}</Link>
    //     );
    // }

    render() {
        return (<>
            <nav className="com-navbar navbar ">
                <Link className="navbar-brand logo-style-2" to="/">
                    <SVG_Logo2 className="app-logo" size={32}/>
                    MyBuy
                </Link>

                <ul className="nav nav-pills">
                    <li className="nav-item">
                        <NavDropdown className="nav-link user" title={(<>
                             <span className="user">{SESION.User?.name.toUpperCase()}</span>
                        </>
                        )} id="basic-nav-dropdown">
                            <NavDropdown.Item href="#" onClick={
                                (e)=>{e.preventDefault(); SESION.SignOut();}}>
                                    <SVG_Salir className="mr-2"/>
                                    <span>Salir</span>
                            </NavDropdown.Item>
                        </NavDropdown>
                    </li>
                </ul>
            </nav>
        </>);
    }
} 