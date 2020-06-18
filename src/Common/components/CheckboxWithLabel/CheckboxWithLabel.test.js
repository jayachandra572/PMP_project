import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import strings from "../../i18n/strings.json"

import CheckboxWithLabel from "."

describe("Test cases for CheckboxWithLabel",()=>{
    it("should test onChange checkbox",()=>{
        const mockOnClickFn = jest.fn()
        const lableText = "completed Elp"
        const props ={
            id:1,
            label:lableText, 
            onClick:mockOnClickFn, 
            value:false
        }
        const {getByTestId,getByText} = render(<CheckboxWithLabel {...props}/>)
        const checkbox = getByTestId(strings.checkboxDataTestId)
        getByText(lableText)
        expect(checkbox.children[0].checked).toBe(false)
    })
})