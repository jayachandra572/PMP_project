import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { action, observable, reaction, toJS } from 'mobx'
import {createMemoryHistory} from "history"

import { Redirect,withRouter} from 'react-router-dom'
import { API_SUCCESS } from '@ib/api-constants'

import { LogInForm } from '../../components/LogInForm'
import strings from '../../i18n/strings.json'

import AuthenticationStore from "../../stores/AuthenticationStore"

type LogInRouteProps = {
   authenticationStore:AuthenticationStore
   history:any
   location:any
}

type errorMessageType = {
   userNameErrorMessage:string
   userPasswordErrorMessage:string
}

type requestObjectType = {
   userName:string
   userPassword:string
}

type eventType = React.FormEvent<HTMLInputElement>

@inject('authenticationStore')
@observer
class LogInRoute extends Component<LogInRouteProps>{
   @observable userName!:string
   @observable userPassword!:string
   @observable errorMessage!:errorMessageType
   constructor(props) {
      super(props)
      this.init()
   }
   init = ():void => {
      this.userName = ''
      this.userPassword = ''
      this.errorMessage = {
         userNameErrorMessage: '',
         userPasswordErrorMessage:""
      }
   }

   @action.bound
   onChangePassword(event:eventType) {
      this.userPassword = event.currentTarget.value
      this.validateUserPassword()
   }

   @action.bound
   onChangeName(e:eventType) {
      this.userName = e.currentTarget.value
      this.validateUserName()
   }

   onLogInFailure = ():void => {
      const { getAuthApiError: apiError } = this.props.authenticationStore
      if (apiError !== null && apiError !== undefined) {
         if (apiError === 'Invalid username') {
            this.errorMessage.userNameErrorMessage = apiError
         } else if (apiError === 'Invalid password') {
            this.errorMessage.userPasswordErrorMessage = apiError
         }
      }
   }

   validateUserName = ():void => {
      const { userName } = this
      this.errorMessage.userNameErrorMessage =
         userName === '' ? strings.userNameErrorMessage : ''
   }

   validateUserPassword = ():void => {
      const { userPassword } = this
      this.errorMessage.userPasswordErrorMessage =
         userPassword === '' ? strings.userPasswordErrorMessage : ''
   }

   signUser = ():void => {
      const { userName, userPassword, onLogInFailure ,toEmptyErrorMessage} = this
      const { userSignIn } = this.props.authenticationStore
      if (userName !== '' && userPassword !== '') {
         toEmptyErrorMessage()
         const requestObject:requestObjectType = {
            userName,
            userPassword
         }
         userSignIn(requestObject, onLogInFailure)
      }
   }

   @action.bound
   toEmptyErrorMessage ():void{
      this.errorMessage = {
         userPasswordErrorMessage: '',
         userNameErrorMessage: ''
      }
   }
   @action.bound
   onSubmitForm(e:React.SyntheticEvent) {
      e.preventDefault()
      const { validateUserName, validateUserPassword, signUser } = this
      validateUserName()
      validateUserPassword()
      signUser()
   }

   reDirectProjectsPage() {
      let { from } = this.props.location.state || { from: { pathname: "/projects" } };
      return (<Redirect to = {from} />)
   }

   render() {
      let { getAuthApiStatus, authApiToken } = this.props.authenticationStore
      const {
         onSubmitForm,
         userName,
         userPassword,
         onChangeName,
         onChangePassword,
         errorMessage,
         reDirectProjectsPage
      } = this
      if (authApiToken) {
         return reDirectProjectsPage()
      }

      return <LogInForm
         userName={userName}
         userPassword={userPassword}
         onChangeName={onChangeName}
         onChangePassword={onChangePassword}
         onSubmitForm={onSubmitForm}
         errorMessage={errorMessage}
         getAuthApiStatus={getAuthApiStatus}
      />
   }
}

export default withRouter(LogInRoute) 
