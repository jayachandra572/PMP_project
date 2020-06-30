import React, { Component, JSXElementConstructor } from 'react'
import { inject, observer } from 'mobx-react'

import AuthenticationStore from '../../Authentication/stores/AuthenticationStore'
import UserDetailsStore from '../../Authentication/stores/UserDetailsStore'

import { Header } from '../components/Header'

interface InjectedProps {
   authenticationStore: AuthenticationStore
   userDetailsStore: UserDetailsStore
}

function withPMPHeader<T>(WrappedComponent: React.ComponentType<T>) {
   @inject('authenticationStore', 'userDetailsStore')
   @observer
   class RenderComponent extends Component<T & InjectedProps> {
      get injectedProps() {
         return this.props as InjectedProps
      }

      render() {
         const { authenticationStore, userDetailsStore } = this.injectedProps
         const { userLogOut } = authenticationStore
         const { name, is_admin } = userDetailsStore.userDetails
         return (
            <>
               <Header name={name} userLogOut={userLogOut} />
               <WrappedComponent is_admin={is_admin} {...(this.props as T)} />
            </>
         )
      }
   }
   return RenderComponent
}
export default withPMPHeader
