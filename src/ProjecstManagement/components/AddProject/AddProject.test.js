import React from "react";
import { render, fireEvent,waitFor } from "@testing-library/react";
import{Provider} from "mobx-react"

import NewProjectService from "../../services/NewProjectService/index.fixtures"
import NewProjectStore from "../../stores/NewProjectStore";
import strings from "../../i18n/strings";

import {AddProject} from "."

let newProjectStore
let newProjectService
const {data_testid} = strings;
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
    
  
    
})