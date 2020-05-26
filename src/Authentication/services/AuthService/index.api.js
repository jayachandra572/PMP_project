import {create} from "apisauce";
import {networkCallWithApisauce} from "../../utils/APIUtils";
import {apiMethods} from  "../../constants/APIConstants";

import serviceConstants from "../../constants/ServiceConstants";
import endPoints from "../endPoints";

class AuthService{
    constructor(){
        this.api=create({
            baseURL:serviceConstants.BaseUrl
        });
    }
    
    signInAPI=(request)=>{
        const {api}=this;
        return networkCallWithApisauce(api,endPoints.signAPI,request,apiMethods.get);
    }
}


export default AuthService;