import React from "react";
import { render } from "@testing-library/react";

import {SignInForm} from ".";
describe("SignInForm tests",()=>{
    it("Should render typed userName",()=>{
        const testUserName="test-user";
        const {getByPlaceholderText}=render(
            <SignInForm userName={testUserName} onChangeName={()=>{}}/>);
        const userNameField=getByPlaceholderText(/Username/i);
        expect(userNameField.value).toBe(testUserName);
    });
    
    it("Should render typed userPassword",()=>{
        const testUserPassword="test-password";
        const {getByPlaceholderText}=render(
            <SignInForm userPassword={testUserPassword} onChangePassword={()=>{}}/>);
        const userPasswordField=getByPlaceholderText(/Password/i);
        expect(userPasswordField.value).toBe(testUserPassword);
    });
    
    it("should render given error message", () => {
        const { getByText } = render(
          <SignInForm errorMessage="Invalid username" />
        );
        getByText(/invalid username/i);
  });
})