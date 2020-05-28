import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { InputLabel } from '../../../Common/components/Lable'
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
   Footer
} from './stylesComponent'

@observer
class LogInForm extends Component {
   static defaultProps = {
      errorMessage: {
         userPasswordErrorMessage: '',
         userNameErrorMessage: ''
      }
   }
   render() {
      const {
         userPassword,
         userName,
         onChangeName,
         onChangePassword,
         onSubmitForm,
         errorMessage,
         getAuthApiStatus
      } = this.props

      return (
         <LogInFormContainer>
            <LogInPage>
               <IbHubsLogo />
               <Header>{strings.loginHeaderContent}</Header>
               <InputLabel
                  lableFor={strings.userNameLable}
                  content={strings.userNameLable}
               />
               <UserName
                  id={strings.userNameLable}
                  type='text'
                  value={userName}
                  onChange={onChangeName}
                  errorMessage={errorMessage.userNameErrorMessage}
                  isError={errorMessage.userNameErrorMessage !== ''}
               />
               <InputLabel
                  lableFor={strings.userPasswordLable}
                  content={strings.userPasswordLable}
               />
               <UserPassWord
                  type='text'
                  id={strings.userPasswordLable}
                  value={userPassword}
                  onChange={onChangePassword}
                  errorMessage={errorMessage.userPasswordErrorMessage}
                  isError={errorMessage.userPasswordErrorMessage !== ''}
               />
               <LogInButton
                  content={strings.loginButton}
                  onClick={onSubmitForm}
                  apiStatus={getAuthApiStatus}
               />
               <Footer>
                  {' '}
                  {strings.noAccount} <SignUp>signUp</SignUp>
               </Footer>
            </LogInPage>
         </LogInFormContainer>
      )
   }
}

export default LogInForm
