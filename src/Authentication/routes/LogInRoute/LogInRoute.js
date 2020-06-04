import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { action, observable ,reaction,toJS} from 'mobx'
import { Redirect } from 'react-router-dom'
import {API_SUCCESS} from '@ib/api-constants'
import {
   getAccessToken
} from '../../utils/StorageUtils'

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
   
   @action.bound
   onChangePassword (e) {
      this.userPassword = e.target.value
      this.validateUserPassword()
   }
   
   @action.bound
   onChangeName (e) {
      this.userName = e.target.value
      this.validateUserName();
   }

   onLogInFailure = () => {
      const { getAuthApiError: apiError } = this.props.authenticationStore
      if (apiError !== null && apiError !== undefined) {
         console.log(apiError)
      }
   }
   
   validateUserName = () =>{
      const {userName} =this;
    this.errorMessage.userNameErrorMessage = userName==="" ?strings.userNameErrorMessage:"";
     
   }
   
   validateUserPassword = () =>{
      const {userPassword} = this;
      this.errorMessage.userPasswordErrorMessage = userPassword==="" ? strings.userPasswordErrorMessage :""
   }

   signUser = () =>{
   const {userName,userPassword,onLogInFailure} = this;
    const { userSignIn } = this.props.authenticationStore
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
   @action.bound
   onSubmitForm(e) {
      e.preventDefault()
     const {validateUserName,validateUserPassword,signUser} = this
     validateUserName();
     validateUserPassword();
     signUser();
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
