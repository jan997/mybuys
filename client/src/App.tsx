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
import { PrivateRoute } from './components/router/PrivateRoute';

// const ModelPage = ({children}:{children: React.ReactNode})=>{
//     return (
//       <>
//           <header> 
//               <NavBar/>
//           </header>

//           {children}

//           <footer className="text-center text-black-50 py-3 ">
//               MyBuy | Copyright @ 2020
//           </footer>
//       </>
//     );
// }

function App() {
  return (
    <div className="App d-flex flex-column h-screen justify-content-between">
      <Router>
        <Switch>
            <PrivateRoute path="/panel">
                <ViewPanel/>
            </PrivateRoute>
            <Route>
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
                    <Route path="/404">
                      <View404/>
                    </Route>
                    <Route>
                      <Redirect to="/404"/>
                    </Route>
                </Switch> 

                <footer className="text-center text-black-50 py-3 ">
                    MyBuy | Copyright @ 2020
                </footer>
            </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
