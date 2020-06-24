import React, { Component, JSXElementConstructor } from 'react'
import { inject, observer } from 'mobx-react'


import AuthenticationStore from "../../Authentication/stores/AuthenticationStore"
import UserDetailsStore from "../../Authentication/stores/UserDetailsStore"


import { Header } from "../components/Header"


type InjectedProps = {
   authenticationStore:AuthenticationStore
   userDetailsStore:UserDetailsStore
}



function withPmpHeader<T>(WrappedComponent:React.ComponentType<T>){
   @inject('authenticationStore', 'userDetailsStore')
   @observer
   class RenderComponent extends Component {
      getInjectedProps = () => this.props as InjectedProps

      render() {
         const props = this.props as T
         const { userLogOut } = this.getInjectedProps().authenticationStore
         const { name, is_admin } = this.getInjectedProps().userDetailsStore.userDetails
         return (
            <>
               <Header name = {name} userLogOut = {userLogOut}/>
               <WrappedComponent is_admin={is_admin} {...props} />
            </>
         )
      }
   }
   return RenderComponent
}
export default withPmpHeader
