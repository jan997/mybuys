import { error } from "console";
import React from "react";
import {Link, NavLink} from "react-router-dom";
import { SetTitle } from "../../utils/utlls";

type MyProps = {
};

type MyState = {  
};

export class ViewHome extends React.Component<MyProps, MyState> {
    state: MyState = {

    };

    componentDidMount(){
        SetTitle("Inicio");
    }
    
    render() {
        return (<>
            <div className="container view-404">

                <div className="row">
                    <div className="col-12 col-sm-10 col-lg-6 mx-auto">
                        <div>
                            <h1 className="display-1 text-center py-4 logo-style-1">Home</h1>
                        </div>
                    </div>
                </div>
            </div>
        </>);
    }
} 