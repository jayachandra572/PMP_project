import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { action, observable, reaction, toJS } from 'mobx'

import { Redirect, withRouter, RouteComponentProps } from 'react-router-dom'

import { PROJECT_ROUTE } from '../../../ProjectsManagement/constants/RouteConstants'

import { LogInForm } from '../../components/LogInForm'
import strings from '../../i18n/strings.json'

import AuthenticationStore from '../../stores/AuthenticationStore'
import { getUserDisplayableErrorMessage } from '../../../Common/utils/APIUtils'

interface LocationState {
   from: string
}

interface LogInRouteProps
   extends RouteComponentProps<{}, any, LocationState | any> {}
interface InjectedProps extends LogInRouteProps {
   authenticationStore: AuthenticationStore
}

type ErrorMessageType = {
   userNameErrorMessage: string
   userPasswordErrorMessage: string
}
type EventType = React.ChangeEvent<HTMLInputElement>

@inject('authenticationStore')
@observer
class LogInRoute extends Component<LogInRouteProps> {
   @observable userName!: string
   @observable userPassword!: string
   @observable errorMessage!: ErrorMessageType
   constructor(props: LogInRouteProps) {
      super(props)
      this.init()
   }
   init = (): void => {
      this.userName = ''
      this.userPassword = ''
      this.errorMessage = {
         userNameErrorMessage: '',
         userPasswordErrorMessage: ''
      }
   }
   get injectedProps() {
      return this.props as InjectedProps
   }

   @action.bound
   onChangePassword(event: EventType) {
      this.userPassword = event.target.value
      this.validateUserPassword()
   }

   @action.bound
   onChangeName(e: EventType) {
      this.userName = e.target.value
      this.validateUserName()
   }

   onLogInFailure = () => {
      let { getAuthApiError: apiError } = this.injectedProps.authenticationStore
      if (apiError !== null && apiError !== undefined) {
         const errorMessage = getUserDisplayableErrorMessage(apiError)
         if (errorMessage === 'Invalid username') {
            this.errorMessage.userNameErrorMessage = errorMessage
         } else if (errorMessage === 'Invalid password') {
            this.errorMessage.userPasswordErrorMessage = errorMessage
         }
      }
   }

   validateUserName = () => {
      const { userName } = this
      this.errorMessage.userNameErrorMessage =
         userName === '' ? strings.userNameErrorMessage : ''
   }

   validateUserPassword = () => {
      const { userPassword } = this
      this.errorMessage.userPasswordErrorMessage =
         userPassword === '' ? strings.userPasswordErrorMessage : ''
   }

   signUser = () => {
      const {
         userName,
         userPassword,
         onLogInFailure,
         toEmptyErrorMessage
      } = this
      const { userSignIn } = this.injectedProps.authenticationStore
      if (userName !== '' && userPassword !== '') {
         toEmptyErrorMessage()
         const requestObject = {
            userName,
            userPassword
         }
         userSignIn(requestObject, onLogInFailure)
      }
   }

   @action.bound
   toEmptyErrorMessage() {
      this.errorMessage = {
         userPasswordErrorMessage: '',
         userNameErrorMessage: ''
      }
   }
   @action.bound
   onSubmitForm(e: React.SyntheticEvent) {
      e.preventDefault()
      const { validateUserName, validateUserPassword, signUser } = this
      validateUserName()
      validateUserPassword()
      signUser()
   }

   reDirectProjectsPage = () => {
      const {
         location: { state }
      } = this.props
      let from = state ? state.from : PROJECT_ROUTE
      return <Redirect to={from} />
   }

   render() {
      let {
         getAuthApiStatus,
         authApiToken
      } = this.injectedProps.authenticationStore
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

      return (
         <LogInForm
            userName={userName}
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

export default withRouter(LogInRoute)
