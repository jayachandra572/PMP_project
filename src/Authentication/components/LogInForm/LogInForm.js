import React, { Component,Fragment } from 'react'
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

@observer
class LogInForm extends Component {
   static defaultProps = {
      errorMessage: {
         userPasswordErrorMessage: '',
         userNameErrorMessage: ''
      }
   }
   
   UserNameInput = observer(() =>{
      const {userName,onChangeName,errorMessage} = this.props;
      return(
         <Fragment>
            <UserNameLabel
               lableFor={strings.userNameLable}
               content={strings.userNameLable}
            />
               <UserName
                  id={strings.userNameLable}
                  value={userName}
                  onChange={onChangeName}
                  errorMessage={errorMessage.userNameErrorMessage}
                  isError={errorMessage.userNameErrorMessage !== ''}
               />
            </Fragment>)
   })
   
   UserPasswordInput = observer(() =>{
      const {userPassword,onChangePassword,errorMessage} =this.props;
      return(
      <Fragment>
       <UserPasswordLabel
                  lableFor={strings.userPasswordLable}
                  content={strings.userPasswordLable}
               />
               <UserPassWord
                  id={strings.userPasswordLable}
                  value={userPassword}
                  onChange={onChangePassword}
                  errorMessage={errorMessage.userPasswordErrorMessage}
                  isError={errorMessage.userPasswordErrorMessage !== ''}
               />
         </Fragment>);
   })
   
   SignButton = observer(() =>{
      const {onSubmitForm,getAuthApiStatus} = this.props;
      return (<LogInButton
                  content={strings.loginButton}
                  onClick={onSubmitForm}
                  apiStatus={getAuthApiStatus}
               />)
   })
   
   render() {
      const {
         UserNameInput,
         UserPasswordInput,
         SignButton
      } = this
      return (
         <LogInFormContainer>
            <LogInPage>
               <IbHubsLogo />
               <Header>{strings.loginHeaderContent}</Header>
              <UserNameInput/>
              <UserPasswordInput/>
              <SignButton/>
               <Footer>
                  {strings.noAccount} <SignUp>signUp</SignUp>
               </Footer>
            </LogInPage>
         </LogInFormContainer>
      )
   }
}

export default LogInForm
