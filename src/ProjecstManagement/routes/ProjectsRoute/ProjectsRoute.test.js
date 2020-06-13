import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { Provider } from 'mobx-react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'

import AuthenticationStore from '../../../Authentication/stores/AuthenticationStore'
import AuthService from '../../../Authentication/services/AuthService/index.fixture'
import ProjectsStore from '../../stores/ProjectsStore'
import ProjectsService from '../../services/ProjectsService/index.fixtures'

import projectResponseData from '../../fixtures/projectResponseData.json'
import strings from '../../i18n/strings.json'

import { ProjectsRoute } from '.'

let authenticationStore
let authService
let projectsService
let projectsStore

const getScreen = () => {
   return render(
      <Provider {...{ authenticationStore, projectsStore }}>
         <Router history={createMemoryHistory()}>
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
      projectsService = new ProjectsService()
      projectsStore = new ProjectsStore(projectsService)
   })

   it('Should test render loading view', () => {
      const mockFetchingProjectPromise = new Promise((resolve, reject) => {})
      const mockprojectsAPI = jest.fn()
      mockprojectsAPI.mockReturnValue(mockFetchingProjectPromise)
      projectsService.projectsAPI = mockprojectsAPI
      const { getByLabelText } = getScreen()
      getByLabelText('audio-loading')
   })

   it('Should test render network error', async () => {
      const mockErrorProjectPromise = new Promise((resolve, reject) =>
         reject(new Error('Error'))
      )
      const mockGetProductAPI = jest.fn()
      mockGetProductAPI.mockReturnValue(mockErrorProjectPromise)
      projectsService.projectsAPI = mockGetProductAPI
      const { getByRole } = getScreen()
      await waitFor(() => {
         getByRole('button', { name: 'Retry' })
      })
   })

   it('Should test render  success UI', async () => {
      mockAPiServiceResponse
      const { getByText, getByRole, getByTestId } = getScreen()
      getByText(strings.ProjectManageMent)
      await waitFor(() => {
         const project = projectsStore.projects[0]
         getByText(strings.ProjectTitle)
         getByRole('button', { name: strings.createButtonContent })
         getByText(project.name)
         getByText(project.description)
         getByText(`${project.createdAt}`)
         getByTestId(strings.nextButtonDataTestId)
         getByTestId(strings.previousButtonDataTestId)
      })
   })
})
