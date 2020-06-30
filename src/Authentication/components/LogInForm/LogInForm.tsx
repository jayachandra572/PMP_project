import React, { Component, Fragment } from 'react'
import { observer } from 'mobx-react'

import { IbHubsLogo } from '../../../Common/components/Logos/IbHubsLogo'
import strings from '../../i18n/strings.json'

import {
   LogInFormContainer,
   Header,
   LogInPage,
   LogInButton,
   UserName,
   UserPassWord,
   SignUp,
   Footer,
   UserNameLabel,
   UserPasswordLabel
} from './stylesComponent'

type errorMessageType = {
   userNameErrorMessage: string
   userPasswordErrorMessage: string
}

type LogInFormProps = {
   userName: string
   userPassword: string
   onChangeName: Function
   onChangePassword: Function
   onSubmitForm: (event: React.SyntheticEvent) => void
   errorMessage: errorMessageType
   getAuthApiStatus: number
}

@observer
class LogInForm extends Component<LogInFormProps> {
   loginPageRefs: {
      userName: React.RefObject<any>
      password: React.RefObject<any>
   }
   static defaultProps = {
      errorMessage: {
         userPasswordErrorMessage: '',
         userNameErrorMessage: ''
      }
   }

   constructor(props: LogInFormProps) {
      super(props)
      this.loginPageRefs = {
         userName: React.createRef(),
         password: React.createRef()
      }
   }

   componentDidMount() {
      this.focusUserNameInput()
   }

   focusOnErrorInput = () => {
      const {
         errorMessage: { userNameErrorMessage, userPasswordErrorMessage }
      } = this.props
      if (userNameErrorMessage !== '') {
         this.focusUserNameInput()
      } else if (userPasswordErrorMessage !== '') {
         this.focusUserPasswordInput()
      }
   }
   focusUserNameInput = () => {
      this.loginPageRefs.userName.current.focus()
   }

   focusUserPasswordInput = () => {
      this.loginPageRefs.password.current.focus()
   }

   UserNameInput = observer(() => {
      const { userName, onChangeName, errorMessage } = this.props
      return (
         <>
            <UserNameLabel
               lableFor={strings.userNameLable}
               content={strings.userNameLable}
            />
            <UserName
               forwardRef={this.loginPageRefs.userName}
               id={strings.userNameLable}
               value={userName}
               onChange={onChangeName}
               errorMessage={errorMessage.userNameErrorMessage}
               isError={errorMessage.userNameErrorMessage !== ''}
            />
         </>
      )
   })

   UserPasswordInput = observer(() => {
      const { userPassword, onChangePassword, errorMessage } = this.props
      return (
         <Fragment>
            <UserPasswordLabel
               lableFor={strings.userPasswordLable}
               content={strings.userPasswordLable}
            />
            <UserPassWord
               forwardRef={this.loginPageRefs.password}
               textType={'password'}
               id={strings.userPasswordLable}
               value={userPassword}
               onChange={onChangePassword}
               errorMessage={errorMessage.userPasswordErrorMessage}
               isError={errorMessage.userPasswordErrorMessage !== ''}
            />
         </Fragment>
      )
   })

   SignButton = observer((): any => {
      const { getAuthApiStatus } = this.props
      return (
         <LogInButton
            content={strings.loginButton}
            apiStatus={getAuthApiStatus}
         />
      )
   })
   render() {
      const {
         UserNameInput,
         UserPasswordInput,
         SignButton,
         props: { onSubmitForm },
         focusOnErrorInput
      } = this
      focusOnErrorInput()
      return (
         <LogInFormContainer>
            <LogInPage onSubmit={onSubmitForm}>
               <IbHubsLogo />
               <Header>{strings.loginHeaderContent}</Header>
               <UserNameInput />
               <UserPasswordInput />
               <SignButton />
               <Footer>
                  {strings.noAccount} <SignUp>signUp</SignUp>
               </Footer>
            </LogInPage>
         </LogInFormContainer>
      )
   }
}

export default LogInForm
