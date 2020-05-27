import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import strings from "../../i18n/strings.json";


import {InputField} from "."
describe("Test cases InputText",()=>{
    it("Should test render value without errorMessage",()=>{
        const mockOnChange = jest.fn();
        const {getByTestId} = render(<InputField
                                textType = "text"
                                value = "UserName"
                                onChange = {mockOnChange}
                                id =  {strings.userNameLable}
                                />);
        getByTestId("inputText");
    });
    it("Should test render errorMessage",()=>{
        const mockOnChange = jest.fn();
        const {getByText,getByRole} = render(<InputField
                                textType = "text"
                                value = "UserName"
                                onChange = {mockOnChange}
                                id = {strings.userNameLable}
                                errorMessage = {strings.userNameErrorMessage}
                                isError = {true}
                                />);
        getByText(strings.userNameErrorMessage);
    })
    
    it("Should test render errorMessage",async ()=>{
        const mockOnChange = jest.fn();
        const changeInputValue = "jayachandra"
        const {getByTestId} = render(<InputField
                                textType = "text"
                                value = "UserName"
                                onChange = {mockOnChange}
                                id = {strings.userNameLable}
                                errorMessage = {strings.userNameErrorMessage}
                                />);
        const inputText = getByTestId("inputText");
        fireEvent.change(inputText,{target:{value:changeInputValue}});
    })
})