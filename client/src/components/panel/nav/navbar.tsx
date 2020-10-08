import { Session } from "inspector";
import React from "react";
import {Link, NavLink} from "react-router-dom";
import { SESION, USER_FILTERS } from "../../../api/user";
import logo from "../../../resources/vertors/logo.svg";
import { TypeProps } from "../../../utils/utlls";

type MyProps = {
};

type MyState = {
};

export class PanelNavBar extends React.Component<MyProps, MyState> {
    state: MyState = {

    };

    _dropdown = React.createRef<HTMLDivElement>();

    MenuOpen(){
        if(this._dropdown.current){
            this._dropdown.current.style.display = "block";
        };
    }
    MenuClose(){
        if(this._dropdown.current){
            this._dropdown.current.style.display = "none";
        };
    }

    NLink(props:{
        click(event:React.MouseEvent<HTMLAnchorElement, MouseEvent>): void,
        text: string| JSX.Element,
        _this: PanelNavBar,
        className?: string,
        disabled?: boolean
    } & TypeProps){
        if(props.disabled){
            return (<>
                <div className={`dropdown-item nlink ${props.className||""}`}>
                    {props.text}
                </div>
            </>);
        }
        return (
            <Link className={`dropdown-item nlink nav-link ${props.className||""}`} to="#" onClick={(e)=>{
                props._this.MenuClose();
                props.click(e);
            }}>
                {props.text}</Link>
        );
    }

    render() {
        const {NLink} = this;
        return (<>
            <nav className="com-navbar navbar navbar-expand-lg">
                <Link className="navbar-brand logo-style-2" to="/">
                    <img src={logo} className="App-logo" alt="logo" />
                    MyBuy
                </Link>

                <ul className="nav nav-pills">
                    <li className="nav-item dropdown">
                        <a className="nav-link  dropdown-toggle" href="#" onClick={(e)=>{
                            e.preventDefault();
                            const state = !this._dropdown.current?.style.display || this._dropdown.current?.style.display === "none"
                            if(state) this.MenuOpen();
                            else this.MenuClose();

                        }}>
                             <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width={40} height={40} viewBox="0 0 172 172" style={{fill: '#000000'}}><defs><radialGradient cx="40.05092" cy="30.07492" r="144.45133" gradientUnits="userSpaceOnUse" id="color-1_kDoeg22e5jUY_gr1"><stop offset={0} stopColor="#0370c8" /><stop offset="0.484" stopColor="#036fc5" /><stop offset="0.775" stopColor="#036abd" /><stop offset={1} stopColor="#0362b0" /></radialGradient><radialGradient cx={86} cy="158.05367" r="57.835" gradientUnits="userSpaceOnUse" id="color-2_kDoeg22e5jUY_gr2"><stop offset={0} stopColor="#000000" /><stop offset={1} stopColor="#000000" stopOpacity={0} /></radialGradient><radialGradient cx={86} cy="71.66667" r="34.04167" gradientUnits="userSpaceOnUse" id="color-3_kDoeg22e5jUY_gr3"><stop offset={0} stopColor="#000000" /><stop offset={1} stopColor="#000000" stopOpacity={0} /></radialGradient><linearGradient x1="66.55325" y1="48.63658" x2="106.55042" y2="88.63375" gradientUnits="userSpaceOnUse" id="color-4_kDoeg22e5jUY_gr4"><stop offset={0} stopColor="#75daff" /><stop offset={1} stopColor="#1ea2e4" /></linearGradient><linearGradient x1="60.94175" y1="111.83583" x2="110.682" y2="161.57608" gradientUnits="userSpaceOnUse" id="color-5_kDoeg22e5jUY_gr5"><stop offset={0} stopColor="#75daff" /><stop offset={1} stopColor="#1ea2e4" /></linearGradient></defs><g fill="none" fillRule="nonzero" stroke="none" strokeWidth={1} strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit={10} strokeDashoffset={0} fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{mixBlendMode: 'normal'}}><path d="M0,172v-172h172v172z" fill="none" /><g><path d="M157.66667,86c0,39.57792 -32.08875,71.66667 -71.66667,71.66667c-39.57792,0 -71.66667,-32.08875 -71.66667,-71.66667c0,-39.57792 32.08875,-71.66667 71.66667,-71.66667c39.57792,0 71.66667,32.08875 71.66667,71.66667z" fill="url(#color-1_kDoeg22e5jUY_gr1)" /><path d="M86,157.66667c20.76542,0 39.4095,-8.88667 52.49942,-22.99783c-8.86517,-20.20642 -29.02142,-34.3355 -52.49942,-34.3355c-23.478,0 -43.63425,14.12908 -52.49942,34.3355c13.08992,14.11117 31.734,22.99783 52.49942,22.99783z" fill="url(#color-2_kDoeg22e5jUY_gr2)" /><circle cx={24} cy={20} transform="scale(3.58333,3.58333)" r="9.5" fill="url(#color-3_kDoeg22e5jUY_gr3)" /><circle cx={24} cy={19} transform="scale(3.58333,3.58333)" r={8} fill="url(#color-4_kDoeg22e5jUY_gr4)" /><path d="M86,157.66667c17.97042,0 34.35342,-6.66142 46.9345,-17.59058c-7.13442,-19.01675 -25.42733,-32.57608 -46.9345,-32.57608c-21.50717,0 -39.80008,13.55933 -46.9345,32.57608c12.58108,10.92917 28.96408,17.59058 46.9345,17.59058z" fill="url(#color-5_kDoeg22e5jUY_gr5)" /></g></g></svg>
                                   
                            {/* {SESION.User?.name} */}
                        </a>
                        <div ref={this._dropdown} className="dropdown-menu panel-user-popup">
                            <NLink _this={this} className="text-center" disabled={true} text={(
                                <>
                                    {/* <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width={24} height={24} viewBox="0 0 172 172" style={{fill: '#000000'}}><defs><radialGradient cx="40.05092" cy="30.07492" r="144.45133" gradientUnits="userSpaceOnUse" id="color-1_kDoeg22e5jUY_gr1"><stop offset={0} stopColor="#0370c8" /><stop offset="0.484" stopColor="#036fc5" /><stop offset="0.775" stopColor="#036abd" /><stop offset={1} stopColor="#0362b0" /></radialGradient><radialGradient cx={86} cy="158.05367" r="57.835" gradientUnits="userSpaceOnUse" id="color-2_kDoeg22e5jUY_gr2"><stop offset={0} stopColor="#000000" /><stop offset={1} stopColor="#000000" stopOpacity={0} /></radialGradient><radialGradient cx={86} cy="71.66667" r="34.04167" gradientUnits="userSpaceOnUse" id="color-3_kDoeg22e5jUY_gr3"><stop offset={0} stopColor="#000000" /><stop offset={1} stopColor="#000000" stopOpacity={0} /></radialGradient><linearGradient x1="66.55325" y1="48.63658" x2="106.55042" y2="88.63375" gradientUnits="userSpaceOnUse" id="color-4_kDoeg22e5jUY_gr4"><stop offset={0} stopColor="#75daff" /><stop offset={1} stopColor="#1ea2e4" /></linearGradient><linearGradient x1="60.94175" y1="111.83583" x2="110.682" y2="161.57608" gradientUnits="userSpaceOnUse" id="color-5_kDoeg22e5jUY_gr5"><stop offset={0} stopColor="#75daff" /><stop offset={1} stopColor="#1ea2e4" /></linearGradient></defs><g fill="none" fillRule="nonzero" stroke="none" strokeWidth={1} strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit={10} strokeDashoffset={0} fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{mixBlendMode: 'normal'}}><path d="M0,172v-172h172v172z" fill="none" /><g><path d="M157.66667,86c0,39.57792 -32.08875,71.66667 -71.66667,71.66667c-39.57792,0 -71.66667,-32.08875 -71.66667,-71.66667c0,-39.57792 32.08875,-71.66667 71.66667,-71.66667c39.57792,0 71.66667,32.08875 71.66667,71.66667z" fill="url(#color-1_kDoeg22e5jUY_gr1)" /><path d="M86,157.66667c20.76542,0 39.4095,-8.88667 52.49942,-22.99783c-8.86517,-20.20642 -29.02142,-34.3355 -52.49942,-34.3355c-23.478,0 -43.63425,14.12908 -52.49942,34.3355c13.08992,14.11117 31.734,22.99783 52.49942,22.99783z" fill="url(#color-2_kDoeg22e5jUY_gr2)" /><circle cx={24} cy={20} transform="scale(3.58333,3.58333)" r="9.5" fill="url(#color-3_kDoeg22e5jUY_gr3)" /><circle cx={24} cy={19} transform="scale(3.58333,3.58333)" r={8} fill="url(#color-4_kDoeg22e5jUY_gr4)" /><path d="M86,157.66667c17.97042,0 34.35342,-6.66142 46.9345,-17.59058c-7.13442,-19.01675 -25.42733,-32.57608 -46.9345,-32.57608c-21.50717,0 -39.80008,13.55933 -46.9345,32.57608c12.58108,10.92917 28.96408,17.59058 46.9345,17.59058z" fill="url(#color-5_kDoeg22e5jUY_gr5)" /></g></g></svg>
                                     */}
                                     <span className="font-weight-bold"> {SESION.User?.name.toUpperCase()}</span>
                                </>
                            )} click={(event)=>{
                                SESION.SignOut();
                            }} />
                            <NLink _this={this} text={(
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width={24} height={24} viewBox="0 0 172 172" style={{fill: '#000000'}}><g fill="none" fillRule="nonzero" stroke="none" strokeWidth={1} strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit={10} strokeDashoffset={0} fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{mixBlendMode: 'normal'}}><path d="M0,172v-172h172v172z" fill="none" /><g id="original-icon" fill="#333333" opacity={0} visibility="hidden"><path d="M103.2,108.93333v-11.46667c2.58,-1.27853 9.9588,-10.062 10.7328,-16.9248c2.0296,-0.1548 5.21733,-2.01813 6.1576,-9.374c0.50453,-3.95027 -1.50213,-6.16907 -2.7176,-6.86853c0,0 3.0272,-5.75053 3.0272,-12.6936c0,-13.92053 -5.46387,-25.8 -17.2,-25.8c0,0 -4.0764,-8.6 -17.2,-8.6c-24.3208,0 -34.4,15.6004 -34.4,34.4c0,6.3296 3.0272,12.6936 3.0272,12.6936c-1.21547,0.69947 -3.22213,2.924 -2.7176,6.86853c0.94027,7.35587 4.128,9.2192 6.1576,9.374c0.774,6.8628 8.1528,15.64627 10.7328,16.9248v11.46667c-5.73333,17.2 -51.6,5.73333 -51.6,45.86667h137.6c0,-40.13333 -45.86667,-28.66667 -51.6,-45.86667z" /></g><g id="subtracted-icon" fill="#333333"><path d="M17.2,154.8c0,-40.13333 45.86667,-28.66667 51.6,-45.86667v-11.46667c-2.58,-1.27853 -9.9588,-10.062 -10.7328,-16.9248c-2.0296,-0.1548 -5.21733,-2.01813 -6.1576,-9.374c-0.50453,-3.94453 1.50213,-6.16907 2.7176,-6.86853c0,0 -3.0272,-6.364 -3.0272,-12.6936c0,-18.7996 10.0792,-34.4 34.4,-34.4c13.1236,0 17.2,8.6 17.2,8.6c11.73613,0 17.2,11.87947 17.2,25.8c0,6.94307 -3.0272,12.6936 -3.0272,12.6936c1.21547,0.69947 3.22213,2.91827 2.7176,6.86853c-0.94027,7.35587 -4.128,9.2192 -6.1576,9.374c-0.774,6.8628 -8.1528,15.64627 -10.7328,16.9248v11.46667c0.11221,0.33662 0.23978,0.66225 0.38209,0.97751c-0.67477,4.48681 -0.26282,9.15064 1.24978,13.85492l-17.27456,17.27456c-3.87464,3.87464 -6.20038,8.71986 -6.97721,13.75968z" /></g><g><g id="Layer_1" fill="#1abc9c"><path d="M163.2822,142.74308c-8.27022,8.27022 -17.17706,7.65655 -25.81434,2.46616c-9.23948,9.23948 -22.0979,22.0979 -22.87216,22.87216c-5.22481,5.22481 -13.7015,5.22481 -18.92631,0c-5.22481,-5.22481 -5.22481,-13.7015 0,-18.92631c0.78573,-0.79146 13.85635,-13.86209 22.87216,-22.87216c-5.1904,-8.64301 -5.80407,-17.54985 2.46616,-25.81434c8.60287,-8.60287 21.13438,-10.81667 31.8134,-6.73891l-18.06029,18.05455l2.86762,14.33811l14.33811,2.86762l18.05455,-18.05455c4.07776,10.67329 1.86395,23.2048 -6.73891,31.80767z" /></g><g id="Layer_1" fill="#000000" opacity={0}><path d="M180.73784,106.84105c-1.38793,-3.63041 -5.05275,-10.11697 -9.38286,-14.44708c-4.33011,-4.33011 -10.81094,-7.99493 -14.44708,-9.38286c-4.74878,-1.81234 -9.73845,-2.73571 -14.83134,-2.73571c-11.02888,0 -21.39246,4.28996 -29.18093,12.07843c-8.95845,8.95845 -11.71137,20.06762 -8.06375,31.41194l-17.27456,17.27456c-9.69256,9.69256 -9.69256,25.45875 0,35.15132c4.69143,4.69717 10.93138,7.28376 17.57279,7.28376c6.64141,0 12.88136,-2.5866 17.57279,-7.27803l2.16792,-2.16792l15.08943,-15.08943c3.24041,1.05529 6.46362,1.58293 9.64095,1.58293c5.52878,0 13.799,-1.67469 21.7882,-9.66389c11.49917,-11.49917 15.16399,-28.77372 9.34845,-44.01801z" /></g></g></g></svg>
                                    <span>Opciones</span>
                                </>
                            )} click={(event)=>{
                                console.log("AAA");
                            }} />
                            <NLink _this={this} text={(
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width={24} height={24} viewBox="0 0 172 172" style={{fill: '#000000'}}><g fill="none" fillRule="nonzero" stroke="none" strokeWidth={1} strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit={10} strokeDashoffset={0} fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{mixBlendMode: 'normal'}}><path d="M0,172v-172h172v172z" fill="none" /><g fill="1"><path d="M28.66667,14.33333v100.33333h20.22433h0.00717c1.97083,0 3.784,-0.91017 4.988,-2.50117l1.763,-2.322l10.95783,8.42083l-1.763,2.31483c-3.612,4.76583 -9.99033,8.42083 -15.94583,8.42083c-0.00717,0 -0.01433,0 -0.0215,0h-20.21v28.66667h43.42283l12.05433,-31.51183c0.72383,-1.85617 0.48017,-3.8915 -0.53033,-5.547l-20.2315,-14.1685c-5.31767,-3.89867 -6.74383,-11.223 -3.28233,-16.8345l13.3085,-23.32033l-6.59333,-1.0965c-1.505,-0.52317 -3.2465,-0.41567 -4.773,0.344l-20.53967,10.277l-5.66883,-11.309l20.54683,-10.28417c4.59383,-2.29333 10.54217,-3.64783 15.40833,-1.97083l8.03383,2.93117l11.008,4.90917c3.79833,1.6985 6.9445,4.67983 8.84367,8.385l5.06683,6.923c1.08933,2.11417 2.91683,3.44 5.289,3.44h18.97017v14.33333l-18.64767,-0.01433c-7.13083,0 -13.588,-3.94167 -16.856,-10.2985l-2.72333,-4.042l-11.30183,20.37483l12.5345,11.27317c5.31767,5.32483 6.99467,13.29417 4.26417,20.28883l-10.26983,26.918h57.33333v-143.33333zM98.642,57.33333c-6.9875,0 -12.64917,-5.66167 -12.64917,-12.64917c0,-6.9875 5.66167,-12.64917 12.64917,-12.64917c6.9875,0 12.64917,5.66167 12.64917,12.64917c0,6.9875 -5.66167,12.64917 -12.64917,12.64917z" /></g></g></svg>
                                    <span>Salir</span>
                                </>
                            )} click={(event)=>{
                                SESION.SignOut();
                            }} />
                        </div>
                    </li>
                </ul>
            </nav>
        </>);
    }
} 