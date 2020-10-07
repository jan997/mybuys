import React from "react";
import { Route, Redirect } from "react-router-dom";
import { SESION } from "../../api/user";

export function PrivateRoute({ children, ...rest }:any) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          SESION.isAuthenticated ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
}