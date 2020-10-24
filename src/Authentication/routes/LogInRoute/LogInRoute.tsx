import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { action, observable, reaction, toJS } from 'mobx'

import { Redirect, withRouter, RouteComponentProps } from 'react-router-dom'

import { PROJECT_ROUTE } from '../../../ProjectsManagement/constants/RouteConstants'

import { LogInForm } from '../../components/LogInForm'

import AuthenticationStore from '../../stores/AuthenticationStore'
import { getUserDisplayableErrorMessage } from '../../../Common/utils/APIUtils'
import { withTranslation, WithTranslation } from 'react-i18next'
import { clearUserSession } from '../../../Common/utils/StorageUtils'

interface LocationState {
   from: string
}
type LogInRouteProps = WithTranslation &
   RouteComponentProps<{}, any, LocationState | any>

interface InjectedProps extends LogInRouteProps {
   authenticationStore: AuthenticationStore
}

interface ErrorMessageType {
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
         setTimeout(clearUserSession, 100)
      }
   }

   validateUserName = () => {
      const { userName } = this
      const { t } = this.props
      this.errorMessage.userNameErrorMessage =
         userName === '' ? t('auth:userPasswordErrorMessage') : ''
   }

   validateUserPassword = () => {
      const {
         userPassword,
         props: { t }
      } = this
      this.errorMessage.userPasswordErrorMessage =
         userPassword === '' ? t('auth:userPasswordErrorMessage') : ''
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

export default withTranslation('translation')(withRouter(LogInRoute))
