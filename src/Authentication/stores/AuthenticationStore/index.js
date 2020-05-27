import {observable,action} from "mobx";
import {API_INITIAL} from "@ib/api-constants";
import {bindPromiseWithOnSuccess} from "@ib/mobx-promise";

import {setAccessToken,getAccessToken,clearUserSession} from "../../utils/StorageUtils";

class AuthenticationStore{
    @observable getAuthApiStatus=API_INITIAL
    @observable getAuthApiError=null
    @observable authApiToken
    
   
    constructor(authService){
        this.authService=authService;
        this.init();
    }
    
    @action.bound
    init(){
        this.authApiToken=getAccessToken();
        this.isError = false;
        this.authorization = null;
    }

    @action.bound
    setAuthApiStatus(status){
        this.getAuthApiStatus=status;
    }
    
    @action.bound
    setAuthApiError(error){
        this.getAuthApiError=error;
    }
    
    
    @action.bound
    setAuthApiResponse(response){
        const accessToken=response.access_token;
        setAccessToken(response.member);
        this.authApiToken=getAccessToken();
        this.authorization = response.member;
    }
    @action.bound
    userSignIn(request, onSuccess, onFailure){
        const {authService:{signInAPI},setAuthApiResponse,setAuthApiError,setAuthApiStatus}=this;
        const signPromise=signInAPI(request);
        
        return bindPromiseWithOnSuccess(signPromise)
        .to(setAuthApiStatus,(response)=>{
            setAuthApiResponse(response),
            onSuccess();
            })
        .catch((error)=>{
            setAuthApiError(error),
            onFailure();
            });
    }
    
    @action.bound
    userSignOut(){
         clearUserSession();
         this.init();
    }
    
    
}

export default AuthenticationStore;