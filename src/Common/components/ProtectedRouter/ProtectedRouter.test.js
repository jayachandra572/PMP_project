import React from 'react'
import { render, waitFor } from '@testing-library/react'
import { Router, withRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { createMemoryHistory } from 'history'

import AuthService from '../../../Authentication/services/AuthService/index.fixtures'
import AuthenticationStore from '../../../Authentication/stores/AuthenticationStore'
import { SIGN_IN_PATH } from '../../../Authentication/constants/RouteConstants'

let authService
let authenticationStore
let history = createMemoryHistory()

import { ProtectedRouter } from '.'

const LocationDisplay = withRouter(({ location }) => (
   <div data-testid='location-display'>{location.pathname}</div>
))

describe('ProtectedRouter test cases', () => {
   beforeEach(() => {
      authService = new AuthService()
      authenticationStore = new AuthenticationStore(authService)
   })

   it('should test navigation  on failure login and on login success navigate enter path', async () => {
      const mockPath = '/projects'
      const {} = render(
         <Provider authenticationStore={authenticationStore}>
            <Router history={history}>
               <ProtectedRouter component={LocationDisplay} path={mockPath} />
            </Router>
         </Provider>
      )
      await waitFor(() => {})
      const { pathname, state } = history.location
      expect(pathname).toBe(SIGN_IN_PATH)
      expect(state.from).toBe(mockPath)
   })

   it('should test navigate on login success and on logout navigate log in page', async () => {
      const mockPath = '/projects'
      authenticationStore.authApiToken = 'access_token'
      history.push(mockPath)
      const { debug, getByTestId } = render(
         <Provider authenticationStore={authenticationStore}>
            <Router history={history}>
               <ProtectedRouter component={LocationDisplay} path={mockPath} />
            </Router>
         </Provider>
      )
      const { pathname, state } = history.location
      expect(pathname).toBe(mockPath)
      getByTestId('location-display')
      authenticationStore.authApiToken = undefined
      expect(history.location.pathname).toBe(SIGN_IN_PATH)
   })
})
