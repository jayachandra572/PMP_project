import React from "react";
import { render, fireEvent,waitFor } from "@testing-library/react";
import DropDown from ".";

describe("Test cases of DropDown menu ",()=>{
    it("should test placeholder",()=>{
        const placeholder = "select user-name"
        const {ByPlaceholderText } = render(<DropDown
            placeholder = {placeholder}
            onChange = {()=>{}}
            options ={[]}
        />);
        
        ByPlaceholderText (placeholder)
    })
}



)