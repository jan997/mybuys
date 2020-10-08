import React from "react";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams, Redirect
  } from "react-router-dom";
import { Footer } from "../../components/footer/footer";
import { ViewPanelHome } from "../../components/panel/home";

  
import { PanelNavBar } from "../../components/panel/nav/navbar";
import { PrivateRoute } from "../../components/router/routers";
import { SetTitle } from "../../utils/utlls";


type MyProps = {
};

type MyState = {  
};

export class ViewPanel extends React.Component<MyProps, MyState> {
    state: MyState = {

    };

    componentDidMount(){
        SetTitle("Inicio");
    }
    
    render() {
        return (<>
            <header className="panel-nav"> 
                <PanelNavBar/>
            </header>

            <div className="view-panel">
                <Switch>
                    <PrivateRoute path="/panel">
                        <ViewPanelHome/>
                    </PrivateRoute>
                </Switch>
            </div>

            <Footer/>
        </>);
    }
} 