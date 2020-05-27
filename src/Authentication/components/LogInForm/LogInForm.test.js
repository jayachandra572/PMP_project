import React from "react";
import { render } from "@testing-library/react";
import strings from "../../i18n/strings.json"


import {LogInForm} from ".";
describe("LogInForm tests",()=>{
    it("Should render typed userName",()=>{
        const testUserName="test-user";
        const {getByLabelText}=render(
            <LogInForm userName={testUserName} onChangeName={()=>{}}/>);
        const userNameField=getByLabelText(strings.userNameLable);
        expect(userNameField.value).toBe(testUserName);
    });
    
    it("Should render typed userPassword",()=>{
        const testUserPassword="test-password";
        const {getByLabelText}=render(
            <LogInForm userPassword={testUserPassword} onChangePassword={()=>{}}/>);
        const userPasswordField=getByLabelText(strings.userPasswordLable);
        expect(userPasswordField.value).toBe(testUserPassword);
    });
    
    it("should render given error message", () => {
        const errorMessage = {
            userNameErrorMessage : strings.userNameErrorMessage,
            userPasswordErrorMessage :"",
        }
        const { getByText } = render(
          <LogInForm  errorMessage = {errorMessage}/>
        );
        getByText(strings.userNameErrorMessage);
  });
})