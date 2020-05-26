import React from "react"
import {Route,Redirect} from "react-router-dom";
import {observer,inject} from "mobx-react";
// import {AuthContext} from "../../context/SignPageContext"
import {
  SIGN_IN_PATH,
} from "../constants/RouteConstants";


const ProtectedRouter=inject("authenticationStore")(observer(({component:Component,path,authenticationStore,...rest})=>{
    const accessToken=authenticationStore.authApiToken;
    const isLogin=!(accessToken===undefined || accessToken==="");
    console.log(isLogin,rest)
    return(<Route
      {...rest}
      render={() =>
        isLogin ? (
          <Component/>
        ) : (
          <Redirect
            to={{
              pathname: SIGN_IN_PATH,
              state: { from: path},
            }}
          />
        )
      }
    />);
}));

export {ProtectedRouter};