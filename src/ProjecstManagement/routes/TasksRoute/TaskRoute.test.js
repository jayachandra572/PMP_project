import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { Provider } from 'mobx-react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import AuthenticationStore from '../../../Authentication/stores/AuthenticationStore'
import AuthService from '../../../Authentication/services/AuthService/index.api'

import userDetailsResponse from '../../../Authentication/fixtures/userDetailsResponse'

import UserDetailsStore from '../../../Authentication/stores/UserDetailsStore'
import TasksStore from '../../stores/TasksStore'
import TasksService from '../../services/TasksService/index.api'
import PageNavigationStore from "../../stores/PageNavigationStore"

import taskResponseData from '../../fixtures/taskResponseData.json'
import strings from '../../i18n/strings.json'

import { TasksRoute } from '.'

let authenticationStore
let authService
let tasksStore
let tasksService
let userDetailsStore
const taskConstants = strings.tasks

const getScreen = () => {
   return  render(
      <Provider {...{ authenticationStore, tasksStore ,userDetailsStore}}>
         <Router history={createMemoryHistory()}>
            <TasksRoute />
         </Router>
      </Provider>
   )
}

describe('Task route tests cases', () => {
   beforeEach(() => {
      authService = new AuthService()
      authenticationStore = new AuthenticationStore(authService)
      userDetailsStore = new UserDetailsStore(authService)
      tasksService = new TasksService()
      tasksStore = new TasksStore(tasksService,PageNavigationStore)
   })

   it('Should test render loading view', () => {
      const {pageNavigation} = tasksStore
      pageNavigation.getEntriesFromApi = () => new Promise(()=>{})
      const { getByLabelText } = getScreen()
      getByLabelText('audio-loading')
   })

   it('Should test render success view', async () => {
      const { Tasks } = taskResponseData
      const { title, created_at, issue_type } = Tasks[0]
      authService.getUserDetails = () => new Promise((resolve)=>resolve(userDetailsResponse))
      tasksStore.pageNavigation.entitiesApiServiceFunction = () => new Promise(resolve=>resolve(taskResponseData))
      const { getByText, getByRole } =  getScreen()
      await waitFor(() => {
         getByText(taskConstants.title)
         getByRole('button', { name: taskConstants.createTaskButtonContent })
         getByText(title)
         getByText(created_at)
      })
   })
   
   it("Should test render failure view of header component", async ()=>{
      authService.getUserDetails = () => new Promise((_,reject)=>reject('Error'))
      tasksStore.pageNavigation.entitiesApiServiceFunction = () => new Promise((resolve)=>resolve(taskResponseData))
      const { getByAltText, getByText,getByRole } =  getScreen()
      await waitFor(()=>{
         getByText(userDetailsStore.getUserDetailsApiError)
         getByRole('button',{name:'Retry'})
         getByAltText(/page not found/i)
      })
   })
   
   it("Should test render failure view of Tasks dashboard component", async ()=>{
       const mockFailurePromise = new Promise((resolve, reject) => reject(new Error('Error')))
      const mockSignInApi = jest.fn()
      mockSignInApi.mockReturnValue(mockFailurePromise)
      authService.getUserDetails = () => {
       return new Promise((resolve)=>resolve(userDetailsResponse))
      }
   tasksStore.pageNavigation.entitiesApiServiceFunction= mockSignInApi
      const { getByAltText, getByText,getByRole } =  getScreen()
      await waitFor(()=>{
         getByAltText(/page not found/i)
      })
      const retryButton =  getByRole('button',{name:'Retry'})
      fireEvent.click(retryButton)
      expect(mockSignInApi).toHaveBeenCalledTimes(2)
   })
   
    it('Should test render page navigation',async ()=>{
      tasksStore.pageNavigation.entitiesApiServiceFunction =()=> new Promise((resolve) =>resolve(taskResponseData))
       authService.getUserDetails = () => {
       return new Promise((resolve)=>resolve(userDetailsResponse))
      }
      const { getByRole, getByTestId } = getScreen()
      await waitFor(()=>{})
      const backButton = getByTestId(strings.previousButtonDataTestId)
      const nextButton = getByTestId(strings.nextButtonDataTestId)
      expect(backButton.disabled).toBe(true)
      fireEvent.click(nextButton)
      expect(backButton.disabled).toBe(false)
      fireEvent.click(backButton)
      const lastButton = getByRole('button',{name:`${tasksStore.pageNavigation.totalNumberOfPages}`})
      fireEvent.click(lastButton)
      expect(nextButton.disabled).toBe(true)
   })
   
   
   it('should test add task form',async ()=>{
      const mockTitleName = "Title1"
      const mockDescription = "description1"
      tasksStore.pageNavigation.entitiesApiServiceFunction =()=> new Promise((resolve) =>resolve(taskResponseData))
       authService.getUserDetails = () => {
       return new Promise((resolve)=>resolve(userDetailsResponse))
      }
      const { 
         getByRole, 
         getByText,
         getByTestId,
         getByLabelText,
         debug} = getScreen()
      await waitFor(()=>{})
      const addTaskButton = getByRole('button',{name:taskConstants.createTaskButtonContent})
      fireEvent.click(addTaskButton);
      getByText("TASK")
      const titleInput =getByTestId("TITLE")
     fireEvent.change(titleInput,{target:{value:mockTitleName}})
     expect(titleInput.value).toBe(mockTitleName)
     const issueTypeMenu = getByTestId(taskConstants.issueTypeLabel)
     fireEvent.click(issueTypeMenu)
     fireEvent.change(issueTypeMenu,{data:{value:'TASK'}})
     const descriptionTextArea = getByTestId(taskConstants.descriptionLabel)
     fireEvent.change(descriptionTextArea,{target:{value:mockDescription}})
     expect(descriptionTextArea.value).toBe(mockDescription)
     const submitButton = getByRole('button',{name:strings.submitButton})
     fireEvent.click(submitButton)
   })
   
})
