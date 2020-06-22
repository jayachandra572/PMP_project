import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { Provider } from 'mobx-react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'

import AuthenticationStore from '../../../Authentication/stores/AuthenticationStore'
import AuthService from '../../../Authentication/services/AuthService/index.fixtures'
import UserDetailsStore from '../../../Authentication/stores/UserDetailsStore'

import userDetailsResponse from '../../../Authentication/fixtures/userDetailsResponse'

import ProjectsStore from '../../stores/ProjectsStore'
import ProjectsService from '../../services/ProjectsService/index.api'
import PageNavigationStore from '../../stores/PageNavigationStore'

import projectResponseData from '../../fixtures/projectResponseData.json'
import strings from '../../i18n/strings.json'

import { ProjectsRoute } from '.'

let authenticationStore
let authService
let projectsService
let projectsStore
let userDetailsStore
const history = createMemoryHistory()

const getScreen = () => {
   return render(
      <Provider {...{ authenticationStore, projectsStore, userDetailsStore }}>
         <Router history={history}>
            <ProjectsRoute />
         </Router>
      </Provider>
   )
}

const mockAPiServiceResponse = () => {
   const mockErrorProjectPromise = new Promise((resolve, reject) => {
      resolve(projectResponseData)
   })
   const mockGetProductAPI = jest.fn()
   mockGetProductAPI.mockReturnValue(mockErrorProjectPromise)
   projectsService.projectsAPI = mockGetProductAPI
}

describe('ProductsDashBoard tests', () => {
   beforeEach(() => {
      authService = new AuthService()
      authenticationStore = new AuthenticationStore(authService)
      userDetailsStore = new UserDetailsStore(authService)
      projectsService = new ProjectsService()
      projectsStore = new ProjectsStore(projectsService, PageNavigationStore)
   })

   it('Should test render loading view', () => {
      const mockFetchingProjectPromise = new Promise((resolve, reject) => {})
      const mockprojectsAPI = jest.fn()
      mockprojectsAPI.mockReturnValue(mockFetchingProjectPromise)
      projectsService.projectsAPI = mockprojectsAPI
      const { getByLabelText } = getScreen()
      getByLabelText('audio-loading')
   })

   it('Should test render  success UI', async () => {
      const mockFetchingProjectPromise = new Promise((resolve, reject) =>
         resolve({
            ...projectResponseData,
            projects: [projectResponseData.projects[0]]
         })
      )
      const mockprojectsAPI = jest.fn()
      mockprojectsAPI.mockReturnValue(mockFetchingProjectPromise)
      projectsStore.pageNavigation.entitiesApiServiceFunction = mockprojectsAPI
      authService.getUserDetails = mockprojectsAPI
      const { getByText, getByTestId } = getScreen()
      await waitFor(() => {
         const project = projectsStore.pageNavigation.currentPageEntities[0]
         getByText(strings.ProjectManageMent)
         getByText(strings.ProjectTitle)
         getByText(project.name)
         getByText(project.description)
         getByText(`${project.createdAt}`)
         getByTestId(strings.nextButtonDataTestId)
         getByTestId(strings.previousButtonDataTestId)
      })
   })

   it('Should test render network error', async () => {
      projectsStore.pageNavigation.entitiesApiServiceFunction = () =>
         new Promise((_, reject) => reject(new Error('error')))
      const { getByRole, getByAltText, debug } = getScreen()
      await waitFor(() => {
         getByAltText(/page not found/i)
         getByRole('button', { name: 'Retry' })
      })
   })

   it('Should test render no data view', async () => {
      const mockFetchingProjectPromise = new Promise((resolve, reject) =>
         resolve({ ...projectResponseData, projects: [] })
      )
      const mockprojectsAPI = jest.fn()
      mockprojectsAPI.mockReturnValue(mockFetchingProjectPromise)
      projectsStore.pageNavigation.entitiesApiServiceFunction = mockprojectsAPI
      authService.getUserDetails = () => {
         return new Promise(resolve => resolve(userDetailsResponse))
      }
      const { getByAltText } = getScreen()
      await waitFor(() => {
         getByAltText('No data Found')
      })
   })

   it('Should test render page navigation', async () => {
      const mockFetchingProjectPromise = new Promise((resolve, reject) =>
         resolve({ ...projectResponseData })
      )
      const mockprojectsAPI = jest.fn()
      mockprojectsAPI.mockReturnValue(mockFetchingProjectPromise)
      projectsStore.pageNavigation.entitiesApiServiceFunction = mockprojectsAPI
      authService.getUserDetails = () => {
         return new Promise(resolve => resolve(userDetailsResponse))
      }
      const { getByRole, getByTestId } = getScreen()
      expect(mockprojectsAPI).toHaveBeenCalledTimes(1)
      await waitFor(() => {})
      const backButton = getByTestId(strings.previousButtonDataTestId)
      const nextButton = getByTestId(strings.nextButtonDataTestId)
      expect(backButton.disabled).toBe(true)
      fireEvent.click(nextButton)
      expect(backButton.disabled).toBe(false)
      const lastButton = getByRole('button', {
         name: `${projectsStore.pageNavigation.totalNumberOfPages}`
      })
      fireEvent.click(lastButton)
      expect(nextButton.disabled).toBe(true)
   })

   it('Should test onClick project navigate tasks route', async () => {
      const { projects } = projectResponseData
      const mockFetchingProjectPromise = new Promise((resolve, reject) =>
         resolve({ ...projectResponseData })
      )
      const mockprojectsAPI = jest.fn()
      mockprojectsAPI.mockReturnValue(mockFetchingProjectPromise)
      projectsStore.pageNavigation.entitiesApiServiceFunction = mockprojectsAPI
      authService.getUserDetails = () => {
         return new Promise(resolve => resolve(userDetailsResponse))
      }
      const { getByRole, getByTestId } = getScreen()
      await waitFor(() => {})
      const project = getByTestId(projects[0].id)
      fireEvent.click(project)
      expect(history.location.pathname).toBe(
         `/projects/${projects[0].id}/tasks`
      )
   })
})
