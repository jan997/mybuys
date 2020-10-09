import React from 'react';
import logo from './logo.svg';
import { NavBar } from "./components/Nav/NavBar/NavBar";
import './styles/default.scss';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams, Redirect
} from "react-router-dom";

import { ViewLogin } from './views/login/login';
import { ViewRegister } from './views/register/register';
import { View404 } from './views/other/404';
import { ViewHome } from './views/home/home';
import { ViewAbout } from './views/other/about';
import { ViewPanel } from './views/panel/panel';
import { PrivateRoute } from './components/router/routers';
import { PublicRoute } from './components/router/routers';
import { SESION } from './api/user';
import { RemoteRun, RemoteUpdate } from './lib/remoteupdate';
import { Footer } from './components/footer/footer';
import { ViewTerms } from './views/other/terms';


(async ()=>{
  await SESION.RESTORE();
  //RemoteRun("routers-sleep");
})();

function App() {
  return (
    <div className="App d-flex flex-column h-screen justify-content-between  ">
      <RemoteUpdate _key="App" content={()=>(
        <Router>
          <Switch>
            
              <PrivateRoute path="/panel">
                  <ViewPanel/>
              </PrivateRoute>
              <PublicRoute>
                  <header> 
                      <NavBar/>
                  </header>

                  <Switch>
                      <Route path="/" exact={true}>
                        <ViewHome/>
                      </Route>  
                      <Route path="/login">
                        <ViewLogin/>
                      </Route>
                      <Route path="/register">
                        <ViewRegister/>
                      </Route>
                      <Route path="/about">
                        <ViewAbout/>
                      </Route>
                      <Route path="/terms">
                        <ViewTerms/>
                      </Route>
                      <Route path="/404">
                        <View404/>
                      </Route>
                      <Route>
                        <Redirect to="/404"/>
                      </Route>
                  </Switch> 

                  <Footer/>
              </PublicRoute>
          </Switch>
        </Router>
      )}/>
    </div>
  );
}

export default App;
