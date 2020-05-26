import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import strigns from "../../i18n/strings.json";

import {InputField} from "."
describe("Test cases InputText",()=>{
    it("Should test render value without errorMessage",()=>{
        const mockOnChange = jest.fn();
        const {getByTestId} = render(<InputField
                                textType = "text"
                                value = "UserName"
                                onChangeValue = {mockOnChange}
                                id = "UserName"
                                />);
        getByTestId("inputText");
    });
    it("Should test render errorMessage",()=>{
        const mockOnChange = jest.fn();
        const {getByText} = render(<InputField
                                textType = "text"
                                value = "UserName"
                                onChangeValue = {mockOnChange}
                                id = "UserName"
                                errorMessage = {strigns.userNameErrorMessage}
                                />);
        getByText(strigns.userNameErrorMessage);
    })
    
    it("Should test render errorMessage",async ()=>{
        const mockOnChange = jest.fn();
        const changeInputValue = "jayachandra"
        const {getByTestId} = render(<InputField
                                textType = "text"
                                value = "UserName"
                                onChangeValue = {mockOnChange}
                                id = "UserName"
                                errorMessage = {strigns.userNameErrorMessage}
                                />);
        const inputText = getByTestId("inputText");
        fireEvent.change(inputText,{target:{value:changeInputValue}});
    })
})