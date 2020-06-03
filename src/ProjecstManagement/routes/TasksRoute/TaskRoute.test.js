import React from "react";
import { render, fireEvent,waitFor } from "@testing-library/react";
import{Provider} from "mobx-react"
import {Router} from "react-router-dom"
import { createMemoryHistory } from "history";

import AuthenticationStore from '../../../Authentication/stores/AuthenticationStore'
import AuthService from '../../../Authentication/services/AuthService/index.fixture'

import TasksStore from '../../stores/TasksStore'
import TasksService from '../../services/TasksService/index.fixtures'

import taskResponseData from "../../fixtures/taskResponseData.json"
import strings from "../../i18n/strings.json"

import {TasksRoute} from "."


let authenticationStore;
let authService;
let tasksStore 
let tasksService 
const taskContants = strings.tasks

const getScreen=()=>{
    return render(
        <Provider {...{authenticationStore,tasksStore}} >
            <Router history={createMemoryHistory()}>
                <TasksRoute />
            </Router>
        </Provider>);
};

describe("Task route tests cases",()=>{
      beforeEach(()=>{
        authService = new AuthService();
        authenticationStore=new AuthenticationStore(authService);
         tasksService = new TasksService();
        tasksStore = new TasksStore(tasksService);
    });
    
     it("Should test render loading view",()=>{
        const {getByLabelText}=getScreen();
        getByLabelText("audio-loading")
    });
    
     it("Should test render success view",async()=>{
        const {tasks} = taskResponseData;
        const {title,created_at,issue_type} = tasks[0];
        const {getByText,getByRole,getAllByText}=getScreen();
        await waitFor(()=>{
            getByText(taskContants.title)
            getByRole('button',{name:taskContants.createTaskButtonContent})
            // getAllByText(title)
            // getByText(title)
            console.log(title)
            // getByText(created_at)
            // getByText(issue_type)
        })
        
    });
    
    
    
})