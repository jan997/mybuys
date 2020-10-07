import { error } from "console";
import React from "react";
import {Link, NavLink} from "react-router-dom";
import { SetTitle } from "../../utils/utlls";

type MyProps = {
};

type MyState = {  
};

export class ViewAbout extends React.Component<MyProps, MyState> {
    state: MyState = {

    };

    componentDidMount(){
        SetTitle("Nosotros");
    }

    render() {
        return (<>
            <div className="container view-404">

                <div className="row">
                    <div className="col-12 col-sm-10 col-lg-6 mx-auto">
                        <div>
                            <h1 className="display-1 text-center py-4 logo-style-1">About</h1>
                        </div>
                    </div>
                </div>
            </div>
        </>);
    }
} 