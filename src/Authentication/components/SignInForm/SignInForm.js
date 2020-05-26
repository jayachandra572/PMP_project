import React,{Component} from "react";
import {observer} from "mobx-react";
import {InputLabel} from "../../../Common/components/Lable";
import {IbHubsLogo} from "../Asserts/IbHubsLogo";
import strings from "../../i18n/strings.json";
import {
        SignFormContainer,
        Header,SignPage,
        SignButton,
        UserName,
        UserPassWord,
        SignUp,
        Footer} from "./stylesComponent";


@observer
class SignInForm extends Component{
    userNameRef = React.createRef();
    componentDidMount(){
        //this.userNameRef.current.focus();
    }
    render(){
        const {
            userPassword,
            userName,
            onChangeName,
            onChangePassword,
            onSubmitForm,errorMessage,
            isSubmit,
            onEnterKeyPress,
            getAuthApiStatus}
        =this.props;
        return(
            <SignFormContainer>
               <SignPage>
                    <IbHubsLogo/>
                    <Header>{strings.loginHeaderContent}</Header>
                    <InputLabel lableFor = {strings.userNameLable} content = {strings.userNameLable}/>
                    <UserName 
                        id = {strings.userNameLable}
                        type = "text"
                        value = {userName}
                        onChangeContent = {onChangeName}
                        errorMessage = {errorMessage.userNameErrorMessage}
                        isError = {errorMessage.userNameErrorMessage!==""}/>
                    <InputLabel lableFor = {strings.userPasswordLable} content = {strings.userPasswordLable}/>
                    <UserPassWord  
                        type = "text" 
                        id = {strings.userPasswordLable}
                        defaultValue = {userPassword}
                        onChangeContent = {onChangePassword}
                        errorMessage = {errorMessage.userPasswordErrorMessage}
                        isError = {errorMessage.userPasswordErrorMessage!==""}/>
                    <SignButton 
                        content = {strings.loginButton} 
                        onClick = {onSubmitForm}
                        apiStatus = {getAuthApiStatus}/>
                    <Footer> {strings.noAccount} <SignUp>signUp</SignUp></Footer>
                </SignPage>
            </SignFormContainer>
                
           );
    }
}

export default  SignInForm;



