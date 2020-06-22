import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { SIGN_IN_PATH } from '../../../Authentication/constants/RouteConstants'

const ProtectedRouter = inject('authenticationStore')(
   observer(({ component: Component, path, authenticationStore, ...rest }) => {
      const { isLogin } = authenticationStore
      return (
         <Route
            {...rest}
            render={() =>
               isLogin ? (
                  <Component />
               ) : (
                  <Redirect
                     to={{
                        pathname: SIGN_IN_PATH,
                        state: { from: path }
                     }}
                  />
               )
            }
         />
      )
   })
)

export { ProtectedRouter }
