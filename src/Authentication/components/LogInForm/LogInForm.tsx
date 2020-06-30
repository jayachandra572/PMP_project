import React, { Component, Fragment } from 'react'
import { observer } from 'mobx-react'

import { withTranslation, WithTranslation } from 'react-i18next'
import { IbHubsLogo } from '../../../Common/components/Logos/IbHubsLogo'

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

interface LogInFormProps extends WithTranslation {
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

   onSubmit = e => {
      this.props.onSubmitForm(e)
      this.focusOnErrorInput()
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
      const { userName, onChangeName, errorMessage, t } = this.props
      return (
         <>
            <UserNameLabel
               lableFor={t('auth:userNameLable')}
               content={t('auth:userNameLable')}
            />
            <UserName
               forwardRef={this.loginPageRefs.userName}
               id={t('auth:userNameLable')}
               value={userName}
               onChange={onChangeName}
               errorMessage={errorMessage.userNameErrorMessage}
               isError={errorMessage.userNameErrorMessage !== ''}
            />
         </>
      )
   })

   UserPasswordInput = observer(() => {
      const { userPassword, onChangePassword, errorMessage, t } = this.props
      return (
         <Fragment>
            <UserPasswordLabel
               lableFor={t('auth:userPasswordLable')}
               content={t('auth:userPasswordLable')}
            />
            <UserPassWord
               forwardRef={this.loginPageRefs.password}
               textType={'password'}
               id={t('auth:userPasswordLable')}
               value={userPassword}
               onChange={onChangePassword}
               errorMessage={errorMessage.userPasswordErrorMessage}
               isError={errorMessage.userPasswordErrorMessage !== ''}
            />
         </Fragment>
      )
   })

   SignButton = observer((): any => {
      const { getAuthApiStatus, t } = this.props
      return (
         <LogInButton
            content={t('auth:loginButton')}
            apiStatus={getAuthApiStatus}
         />
      )
   })
   render() {
      const {
         UserNameInput,
         UserPasswordInput,
         SignButton,
         onSubmit,
         props: { t }
      } = this
      return (
         <LogInFormContainer>
            <LogInPage onSubmit={onSubmit}>
               <IbHubsLogo />
               <Header>{t('auth:loginHeaderContent')}</Header>
               <UserNameInput />
               <UserPasswordInput />
               <SignButton />
               <Footer>
                  {t('auth:noAccount')} <SignUp>signUp</SignUp>
               </Footer>
            </LogInPage>
         </LogInFormContainer>
      )
   }
}

export default withTranslation('translation')(LogInForm)
