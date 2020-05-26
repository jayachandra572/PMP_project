import React from "react"; 
import { render, fireEvent, waitFor } from "@testing-library/react";
import { Router, Route, withRouter } from "react-router-dom";
import { Provider } from "mobx-react";
import { createMemoryHistory } from "history";

import {Product_Path,SIGN_IN_PATH} from "../constants/RouteConstants"
import AuthenticationStore from "../stores/AuthenticationStore"
import AuthService from "../services/AuthService/index.api"
import {ProtectedRouter} from "./AuthUtils"
import {SignInRoute} from "../routes/SignInRoute"

let authService=new AuthService();
let authenticationStore=new AuthenticationStore(authService);
describe("Authentication Utils test cases", ()=>{
    
    it("Should test protectRoute utils",async ()=>{
        console.log(authenticationStore.authApiToken)
    
        const {getByText,getByTestId,debug}=render(()=>{
            <Provider authenticationStore={authenticationStore}>
           <SignInRoute/>
           </Provider>
        });
        await waitFor(()=>{})
        debug();
    })
})

// <Provider authenticationStore={authenticationStore}>
//                 <Router history={history}>
//                     <Route path={SIGN_IN_PATH} component={SignPage}/>
//                     <ProtectedRouter path={Product_Path} component={LocationDisplay}/>
//                 </Router>
//             </Provider>