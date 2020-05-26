import React,{Component} from "react"
import {inject,observer} from "mobx-react"
import {action,observable} from "mobx";
import {Redirect} from "react-router-dom";

import {SignInForm} from "../../components/SignInForm";
import strings from "../../i18n/strings.json";

import {
  Product_Path
} from "../../constants/RouteConstants";

@inject("authenticationStore")
@observer
class  SignInRoute extends Component{
    @observable isSubmit
    @observable userName
    @observable userPassword
    @observable errorMessage
    constructor(props){
        super(props);
        this.init();
    }
    init=()=>{
        this.userName="";
        this.userPassword="";
        this.errorMessage={userNameErrorMessage:"",userPasswordErrorMessage:""}
        this.apiError=null;
        this.isSubmit=false;
    }
    onChangePassword=(e)=>{
        this.userPassword=e.target.value;
    }
    onChangeName=(e)=>{
        console.log(e.target.value)
        this.userName=e.target.value;
    }
    onSignInFailure = () => {
        const { getAuthApiError: apiError } = this.props.authenticationStore;
        if (apiError !== null && apiError !== undefined) {
            this.apiError = apiError;
            this.errorMessage="Retry";
        }
    }
    @action.bound
    async onSubmitForm(e){
        e.preventDefault();
        const {userSignIn}=this.props.authenticationStore;
        const {onSignInSuccess,userName,userPassword,onSignInFailure,submitted}=this;
        if (userName===""){
            this.errorMessage ={userPasswordErrorMessage:"",userNameErrorMessage:strings.userNameErrorMessage};
        }else if(userPassword===""){
            this.errorMessage ={userPasswordErrorMessage:strings.userPasswordErrorMessage,userNameErrorMessage:""};
        }else {
            submitted();
            const requestObject={ userName:userName,userPassword:userPassword};
            await userSignIn(requestObject,onSignInSuccess,onSignInFailure);
        }
    }
    
    @action.bound
    submitted(){
        this.isSubmit=true;
    }
    
    @action.bound
    onSignInSuccess(){
        const {authenticationStore:{authApiToken}}=this.props;
        const {state}=this.props.location;
         if(authApiToken){
             if(state!==undefined){
             const {from}=state;
             this.props.history.replace(from);
            //  return <Redirect to={{pathname:from}} render={()=><Component/>}/>
             }
         }
    }
    
    onEnterKeyPress = e => {
    if (e.key === "Enter") {
      this.onSubmitForm(e);
    }
  };
    
    renderHomePage=()=>{
         return <Redirect to={{pathname:Product_Path}}/>;
    }
    
    render(){
    const {authApiToken,getAuthApiStatus}=this.props.authenticationStore;
    const {
            onSubmitForm,
            isSubmit,
            username,
            userPassword,
            onChangeName,
            onChangePassword,
            errorMessage,
            onEnterKeyPress}=this;
    return(<SignInForm 
                username={username}
                userPassword={userPassword}
                onChangeName={onChangeName}
                onChangePassword={onChangePassword}
                onSubmitForm={onSubmitForm}
                errorMessage={errorMessage}
                isSubmit={isSubmit}
                onEnterKeyPress={onEnterKeyPress}
                getAuthApiStatus = {getAuthApiStatus}
                />);
    }
}

export {SignInRoute};