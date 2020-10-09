import { error } from "console";
import React from "react";
import {Link, NavLink} from "react-router-dom";
import { SetTitle } from "../../utils/utlls";
import photo from "../../resources/img.png";

type MyProps = {
};

type MyState = {  
};
//"visibility: visible; animation-name: fadeInUp;" visibility: visible; animation-name: zoomIn;
export class ViewHome extends React.Component<MyProps, MyState> {
    state: MyState = {

    };

    componentDidMount(){
        SetTitle("Inicio");
    }
    
    render() {
        return (<>
            <div className="container view-home page-hero-section bg-image hero-home-1">
                <div className="hero-caption">
                    <div className="container fg-white h-100">
                    <div className="row align-items-center h-100">
                        <div className="col-lg-6 wow fadeInUp animated"  style={{visibility: "visible", animationName: "fadeInUp"}}>
                        <div className="badge badge-soft mb-2">#1 Alkemy</div>
                        <h1 className="mb-4 fw-normal">La mejor web para tu estilo de vida moderno</h1>
                        <p className="mb-4">MyBuy tiene funciones para ver y administrar
nuestras finanzas, como transferencias y estadísticas..</p> 

                        <Link to="/register" className="btn btn-dark button-register" >Comenzar</Link>

                        </div>
                            <div className="col-lg-6 d-none d-lg-block wow zoomIn animated" style={{visibility: "visible", animationName: "zoomIn"}} >
                                <div className="img-place mobile-preview shadow floating-animate">
                                    <img src={photo} alt=""/>
                                </div>          
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>);
    }
} 