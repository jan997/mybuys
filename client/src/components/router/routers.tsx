import React from "react";
import { Route, Redirect } from "react-router-dom";
import { SESION } from "../../api/user";
import { RemoteUpdate } from "../../lib/remoteupdate";
import { TypeProps } from "../../utils/utlls";
import { Loading } from "../loading";

function SleepRoute(props: {} & TypeProps){
    return (
        <RemoteUpdate _key="routers-sleep" content={()=>{
            const SleepValid = SESION.isSesion && !SESION.isAuthenticated;
            
            if(SleepValid){
                return (<>
                    <header></header>
                    <Loading/>
                    <footer></footer>
                </>);
            }
            return (<>
                {props.children}
            </>);
        }}/>
    );
}

export function PublicRoute({ children, ...rest }:any) {
    return (
        <SleepRoute>
            <Route
            {...rest}
            render={({ location }) =>
                !SESION.isAuthenticated ? (
                children
                ) : (
                <Redirect
                    to={{
                    pathname: "/panel",
                    state: { from: location }
                    }}
                />
                )
            }
            />
        </SleepRoute>
    );
}



export function PrivateRoute({ children, ...rest }:any) {

    return (
        <SleepRoute>
            <Route
            {...rest}
            render={({ location }) =>
                SESION.isAuthenticated ? (
                children
                ) : (
                SESION.isSesion?(
                    <>
    
                    </>
                ):(
                    <Redirect
                        to={{
                        pathname: "/login",
                        state: { from: location }
                        }}
                    />
                )
    
                )
            }
            />
        </SleepRoute>
    );
}
