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
import { ViewPanelHome } from "./home/home";
  
import { PanelNavBar } from "../../components/panel/nav/navbar";
import { PrivateRoute } from "../../components/router/routers";
import { SetTitle } from "../../utils/utlls";
import { ViewPanelCreate } from "./create/create";


type MyProps = {
};

type MyState = {  
};

export class ViewPanel extends React.Component<MyProps, MyState> {
    state: MyState = {

    };
    
    render() {
        return (<>
            <header className="panel-nav"> 
                <PanelNavBar/>
            </header>

            <div className="view-panel flex-basis-auto">
                <Switch>
                    <PrivateRoute path="/panel/add">
                        <ViewPanelCreate/>
                    </PrivateRoute>
                    <PrivateRoute path="/panel/edit">
                        <ViewPanelCreate/>
                    </PrivateRoute>
                    <PrivateRoute path="/panel" exact={true}>
                        <ViewPanelHome/>
                    </PrivateRoute>
                    <PrivateRoute>
                        <Redirect to="/panel"/>
                    </PrivateRoute>
                </Switch>
            </div>

            <Footer/>
        </>);
    }
} 