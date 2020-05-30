import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { action, observable ,reaction} from 'mobx'
import { Redirect } from 'react-router-dom'
import {API_SUCCESS} from '@ib/api-constants'

import { LogInForm } from '../../components/LogInForm'
import strings from '../../i18n/strings.json'

@inject('authenticationStore')
@observer
class LogInRoute extends Component {
   @observable userName
   @observable userPassword
   @observable errorMessage
   constructor(props) {
      super(props)
      this.init()
   }
   init = () => {
      this.userName = ''
      this.userPassword = ''
      this.errorMessage = {
         userNameErrorMessage: '',
         userPasswordErrorMessage: ''
      }
      this.apiError = null
   }

   onChangePassword = e => {
      this.userPassword = e.target.value
   }

   onChangeName = e => {
      this.userName = e.target.value
   }

   onLogInFailure = () => {
      const { getAuthApiError: apiError } = this.props.authenticationStore
      if (apiError !== null && apiError !== undefined) {
         this.apiError = apiError
         this.errorMessage = 'Retry'
      }
   }

   @action.bound
   async onSubmitForm(e) {
      e.preventDefault()
      const { userSignIn } = this.props.authenticationStore
      const { userName, userPassword, onLogInFailure } = this

      if (userName === '') {
         this.errorMessage.userNameErrorMessage = strings.userNameErrorMessage
      }
      if (userPassword === '') {
         this.errorMessage.userPasswordErrorMessage =
            strings.userPasswordErrorMessage
      }
      if (userName !== '' && userPassword !== '') {
         this.errorMessage = {
            userPasswordErrorMessage: '',
            userNameErrorMessage: ''
         }
         const requestObject = {
            userName: userName,
            userPassword: userPassword
         }
         userSignIn(requestObject, onLogInFailure)
      }
   }

 
   reDirectProjectsPage() {
      return <Redirect to="/projects" />;
   }
   

   render() {
      let { getAuthApiStatus, authApiToken } = this.props.authenticationStore;
      const {
         onSubmitForm,
         username,
         userPassword,
         onChangeName,
         onChangePassword,
         errorMessage,
         reDirectProjectsPage
      } = this
      if (authApiToken) {
         return reDirectProjectsPage()
      }

      return (
         <LogInForm
            username={username}
            userPassword={userPassword}
            onChangeName={onChangeName}
            onChangePassword={onChangePassword}
            onSubmitForm={onSubmitForm}
            errorMessage={errorMessage}
            getAuthApiStatus={getAuthApiStatus}
         />
      )
   }
}

export { LogInRoute }
