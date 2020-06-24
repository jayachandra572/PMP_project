import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { Router, Route, withRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { createMemoryHistory } from 'history'

import strings from '../../i18n/strings.json'

import { SIGN_IN_PATH, } from '../../constants/RouteConstants'
import AuthApiService from '../../services/AuthService/index.fixtures'
import AuthStore from '../../stores/AuthenticationStore'
import  getUserSignInResponse from '../../fixtures/getUserSignInResponse.json'


import AuthService from "../../services/AuthService"
import { LogInRoute } from '.'



describe('LogInRoute Tests', () => {
   let authApiService:AuthService
   let authStore:AuthStore
   beforeEach(() => {
      authApiService = new AuthApiService()
      authStore = new AuthStore(authApiService)
   })
   afterEach(() => {
      jest.resetAllMocks()
   })

   it('should submit sign-in on press enter', async () => {
      const mockLoadingSignApi = new Promise(() => {})
      const mockSignInApi = jest.fn()
      mockSignInApi.mockReturnValue(mockLoadingSignApi)
      authApiService.signInAPI = mockSignInApi

      const { getByRole, getByLabelText } = render(
         <Router history={createMemoryHistory()}>
            <LogInRoute authenticationStore={authStore} />
         </Router>
      )
      const userName = 'test-user'
      const userPassword = 'test-password'
      const userNameField = getByLabelText(strings.userNameLable)
      const userPasswordField = getByLabelText(strings.userPasswordLable)
      const signInButton = getByRole('button', { name: strings.loginButton })

      fireEvent.change(userNameField, { target: { value: userName } })
      fireEvent.change(userPasswordField, { target: { value: userPassword } })
      fireEvent.keyDown(signInButton, { key: 'Enter', code: 13 })
      waitFor(() => {
         getByLabelText('audio-loading')
      })
   })

   it('should render signInRoute loading state', () => {
      const { getByRole, getByLabelText } = render(
         <Router history={createMemoryHistory()}>
            <LogInRoute authenticationStore={authStore} />
         </Router>
      )
      const userName = 'test-user'
      const userPassword = 'test-password'
      const userNameField = getByLabelText(strings.userNameLable)
      const userPasswordField = getByLabelText(strings.userPasswordLable)

      let signInButton = getByRole('button', { name: 'LOGIN' })

      const mockLoadingSignApi = new Promise(() => {})
      const mockSignInApi = jest.fn()
      mockSignInApi.mockReturnValue(mockLoadingSignApi)
      authApiService.signInAPI = mockSignInApi

      fireEvent.change(userNameField, { target: { value: userName } })
      fireEvent.change(userPasswordField, { target: { value: userPassword } })
      fireEvent.click(signInButton)

      getByLabelText('audio-loading')
      
   })

   it('should render signInRoute success state', async () => {
      const history = createMemoryHistory()
      const route = SIGN_IN_PATH
      const userName = 'test-user'
      const userPassword = 'test-password'
      history.push(route)
      const { getByLabelText, getByRole, queryByRole } = render(
         <Provider authenticationStore={authStore}>
            <Router history={history}>
               <Route path={SIGN_IN_PATH} component={LogInRoute} />
            </Router>
         </Provider>
      )
      const userNameField = getByLabelText(strings.userNameLable)
      const userPasswordField = getByLabelText(strings.userPasswordLable)
      const logInButton = getByRole('button', { name: strings.loginButton })

      const mockLoadingSignApi = new Promise((resolve) => {
         resolve(getUserSignInResponse)
      })
      const mockSignInApi = jest.fn()
      mockSignInApi.mockReturnValue(mockLoadingSignApi)
      authApiService.signInAPI = mockSignInApi

      fireEvent.change(userNameField, { target: { value: userName } })
      fireEvent.change(userPasswordField, { target: { value: userPassword } })
      fireEvent.click(logInButton)

      await waitFor(() => {
         expect(
            queryByRole('button', { name: strings.loginButton })
         ).not.toBeInTheDocument()
      })
   })

   it('should render products page when forced accessed sign', async () => {
      const history = createMemoryHistory()
      const route = SIGN_IN_PATH
      authStore.authApiToken = 'member'
      history.push(route)
      const { queryByRole, getByTestId } = render(
         <Provider authenticationStore={authStore}>
            <Router history={history}>
               <Route path={SIGN_IN_PATH} component={LogInRoute} />
            </Router>
         </Provider>
      )

      await waitFor(() => {
         expect(
            queryByRole('button', { name: strings.loginButton })
         ).not.toBeInTheDocument()
      })
   })
})