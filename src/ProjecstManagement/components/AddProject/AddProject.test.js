import React from "react";
import { render, fireEvent,waitFor } from "@testing-library/react";
import{Provider} from "mobx-react"

import NewProjectService from "../../services/NewProjectService/index.fixtures"
import NewProjectStore from "../../stores/NewProjectStore";
import strings from "../../i18n/strings";

import {AddProject} from "."

let newProjectStore
let newProjectService
const {addProject} = strings;
const getScreen=()=>{
    return render(
        <Provider newProjectStore ={newProjectStore}>
            <AddProject  />
        </Provider>);
}

describe("Test cases for AddProject Form  ",()=>{
    
    beforeEach(()=>{
      newProjectService = new NewProjectService();
      newProjectStore = new NewProjectStore(newProjectService);
    });
    it("Should test render loading state",()=>{
        const { getByText} = getScreen();
        getByText("Loading")
    })
    
    it("Should test render success state",async ()=>{
        const { getByText,getByLabelText,getByTestId,getByDisplayValue} = getScreen();
        await waitFor(()=>{
          getByLabelText(addProject.lableName)
          getByText(addProject.title)
        })
    })
    
})