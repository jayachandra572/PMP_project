import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { Router, Route, withRouter } from "react-router-dom";
import { Provider } from "mobx-react";
import { createMemoryHistory } from "history";

import {
  SIGN_IN_PATH,
  Product_Path
} from "../../constants/RouteConstants";

import AuthApiService from "../../services/AuthService/index.api";
import AuthStore from "../../stores/AuthenticationStore";
import getUserSignInResponse from "../../fixtures/getUserSignInResponse.json";

import {SignInRoute} from ".";

const LocationDisplay = withRouter(({ location }) => (
  <div data-testid="location-display">{location.pathname}</div>
));

describe("SignInRoute Tests",()=>{
    let authApiService;
    let authStore;
    beforeEach(()=>{
        authApiService = new AuthApiService();
        authStore=new AuthStore(authApiService);
    });
    afterEach(()=>{
        jest.resetAllMocks();
    })
    
    it("Should test username empty errorMessage",()=>{
        const {getByText,getByRole}=render(
            <Router history={createMemoryHistory()}>
                <SignInRoute authenticationStore={authStore}/>
            </Router>);
            const signInButton=getByRole('button',{name:"Sign In"});
            fireEvent.click(signInButton)
            getByText(/Please enter username/i)
    })
    
    it("should test no errorMessage shown when typing",()=>{
        const username="test-user"
        const {getByLabelText,queryByText,getByRole}=render(
            <Router history={createMemoryHistory()}>
                <SignInRoute authenticationStore={authStore}/>
            </Router>);
        const signInButton=getByRole('button',{name:"Sign In"});
        const userNameField=getByLabelText('Username');
        fireEvent.click(signInButton)
        fireEvent.keyPress(userNameField)
        expect(queryByText("Please enter username")).toBeInTheDocument();
        
        
    })
    
    it ("Should render userpassword empty  errorMessage",()=>{
        const {getByText,getByRole,getByLabelText}=render(
            <Router history={createMemoryHistory()}>
                <SignInRoute authenticationStore={authStore}/>
            </Router>);
        
        const userName="test-user";
        const userNameField=getByLabelText('Username');
        const signInButton=getByRole('button',{name:"Sign In"});
        fireEvent.change(userNameField,{target:{value:userName}});
        fireEvent.click(signInButton);
        getByText(/Please enter Password/i);
        
    });
    
    it("should submit sign-in on press enter",async ()=>{
        const mockLoadingSignApi=new Promise((resolve,reject)=>{});
        const mockSignInApi=jest.fn();
        mockSignInApi.mockReturnValue(mockLoadingSignApi);
        authApiService.signInAPI=mockSignInApi;
        
        const {getByRole,getByLabelText,debug}=render(
            <Router history={createMemoryHistory()}>
                <SignInRoute authenticationStore={authStore}/>
            </Router>);
        const userName = "test-user";
        const userPassword = "test-password";
        const userNameField = getByLabelText('Username');
        const userPasswordField = getByLabelText('Password');
        const signInButton=getByRole('button',{name:"Sign In"});
       
        fireEvent.change(userNameField,{target:{value:userName}});
        fireEvent.change(userPasswordField,{target :{value:userPassword}});
        fireEvent.keyDown(signInButton,{key:"Enter",code:13});
        debug()
        waitFor(() =>{getByLabelText("audio-loading");});
    });
    
    it("should render signInRoute loading state",()=>{
        const {getByRole,getByLabelText}=render(
            <Router history={createMemoryHistory()}>
                <SignInRoute authenticationStore={authStore}/>
            </Router>);
        const userName = "test-user";
        const userPassword = "test-password";
        const userNameField = getByLabelText('Username');
        const userPasswordField = getByLabelText('Password');
        let signInButton=getByRole('button',{name:"Sign In"});
       
        const mockLoadingSignApi=new Promise((resolve,reject)=>{});
        const mockSignInApi=jest.fn();
        mockSignInApi.mockReturnValue(mockLoadingSignApi);
        authApiService.signInAPI=mockSignInApi;
       
        fireEvent.change(userNameField,{target:{value:userName}});
        fireEvent.change(userPasswordField,{target:{value:userPassword}});
        fireEvent.click(signInButton);
        
        getByLabelText("audio-loading");
        getByRole("button", { disabled: true });
    
    })
    
    it("should render signInRoute success state",async ()=>{
        const history = createMemoryHistory();
        const route = SIGN_IN_PATH;
         const userName = "test-user";
        const userPassword = "test-password";
        history.push(route);
        const {getByLabelText,getByRole,queryByRole,getByTestId}=render(
            <Provider authenticationStore={authStore}>
                <Router history={history}>
                    <Route path={SIGN_IN_PATH} component={SignInRoute}/>
                    <Route path={Product_Path} component={LocationDisplay}/>
                </Router>
            </Provider>)
        const userNameField = getByLabelText('Username');
        const userPasswordField = getByLabelText('Password');
        const signInButton=getByRole('button',{name:"Sign In"});
        
        const mockLoadingSignApi=new Promise((resolve,reject)=>{
            resolve(getUserSignInResponse);
        });
        const mockSignInApi=jest.fn();
        mockSignInApi.mockReturnValue(mockLoadingSignApi);
        authApiService.signInAPI=mockSignInApi;
        
        fireEvent.change(userNameField,{target:{value:userName}});
        fireEvent.change(userPasswordField,{target:{value:userPassword}});
        fireEvent.click(signInButton);
        
        await waitFor(()=>{
            expect(queryByRole("button", { name: "Sign in" })).not.toBeInTheDocument();
            expect(getByTestId("location-display")).toHaveTextContent(Product_Path);
        })
    });
    
    it("should render signInRoute failure state",async ()=>{
        authStore.userSignOut();
        const {getByText,getByRole,getByLabelText}=render(
            <Router history={createMemoryHistory()}>
                <SignInRoute authenticationStore={authStore}/>
            </Router>);
        const userName = "test-user";
        const userPassword = "test-password";
        const userNameField = getByLabelText('Username');
        const userPasswordField = getByLabelText('Password');
        let signInButton=getByRole('button',{name:"Sign In"});
       
        const mockLoadingSignApi=new Promise((resolve,reject)=>{
            reject(new Error("error"));
        }).catch(()=>{});
        const mockSignInApi=jest.fn();
        mockSignInApi.mockReturnValue(mockLoadingSignApi);
        authApiService.signInAPI=mockSignInApi;
        
        fireEvent.change(userNameField,{target:{value:userName}});
        fireEvent.change(userPasswordField,{target:{value:userPassword}});
        fireEvent.click(signInButton);
       
        await  waitFor(()=>{
            getByText(/Retry/i);
        })
    })
    
    it("should render products page when forced accessed sign",async ()=>{
        const history = createMemoryHistory();
        const route = SIGN_IN_PATH;
        authStore.authApiToken="access-token";
        history.push(route);
        const {queryByRole,getByTestId}=render(
            <Provider authenticationStore={authStore}>
                <Router history={history}>
                    <Route path={SIGN_IN_PATH} component={SignInRoute}/>
                    <Route path={Product_Path} component={LocationDisplay}/>
                </Router>
            </Provider>)
        
        await waitFor(()=>{
            expect(queryByRole("button", { name: "Sign in" })).not.toBeInTheDocument();
            expect(getByTestId("location-display")).toHaveTextContent(Product_Path);
        })
    });
})