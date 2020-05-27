import React,{Component} from "react"
import {inject,observer} from "mobx-react"
import {action,observable} from "mobx";
import {Redirect} from "react-router-dom";

import {LogInForm} from "../../components/LogInForm";
import strings from "../../i18n/strings.json";

import {
  Product_Path
} from "../../constants/RouteConstants";

@inject("authenticationStore")
@observer
class  LogInRoute extends Component{
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
        this.errorMessage={userNameErrorMessage:"",userPasswordErrorMessage:""};
        this.apiError=null;
    }
    
    onChangePassword=(e)=>{
        this.userPassword=e.target.value;
    }
    
    onChangeName=(e)=>{
        this.userName=e.target.value;
    }
    
    onLogInFailure = () => {
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
        const {onLogInSuccess,userName,userPassword,onLogInFailure}=this;
        
        if (userName===""){
            this.errorMessage.userNameErrorMessage = strings.userNameErrorMessage;
        }if(userPassword===""){
            this.errorMessage.userPasswordErrorMessage = strings.userPasswordErrorMessage;
        }if(userName!=="" && userPassword !=="") {
            this.errorMessage = {userPasswordErrorMessage:"",userNameErrorMessage:""};
            const requestObject={ userName:userName,userPassword:userPassword};
            await userSignIn(requestObject,onLogInSuccess,onLogInFailure);
        }
    }
    
    
    @action.bound
    onLogInSuccess(){
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
    
    reDirectAdminPage=()=>{
         return <Redirect to="/admin"/>;
    }
    reDirectMemberPage () {
        return <Redirect to ="/member"/>
    }
    
    render(){
    let {getAuthApiStatus,authApiToken}=this.props.authenticationStore;
    const {
            onSubmitForm,
            username,
            userPassword,
            onChangeName,
            onChangePassword,
            errorMessage,
            reDirectAdminPage,
            reDirectMemberPage
    }=this;
    authApiToken = ""
    if(authApiToken==="admin"){
        return reDirectAdminPage();
    }else if(authApiToken === "member"){
        return reDirectMemberPage();
    }
    
    return(<LogInForm 
                username={username}
                userPassword={userPassword}
                onChangeName={onChangeName}
                onChangePassword={onChangePassword}
                onSubmitForm={onSubmitForm}
                errorMessage={errorMessage}
                getAuthApiStatus = {getAuthApiStatus}
                />);
    }
}

export {LogInRoute};