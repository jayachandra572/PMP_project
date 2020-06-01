import { observable} from 'mobx'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import { API_INITIAL } from '@ib/api-constants';

class ApiCallModel{
    @observable getApiStatus =API_INITIAL;
    @observable getApiError = null
    @observable response = []
    constructor (apiCallFunction){
        this.apiCallFunction=apiCallFunction;
    }
    setApiError = (error) =>{
     this.getApiError = error;
   }
   
    setApiResponse = (response) =>{
        this.response = response;
   }
   setApiStatus = (status) =>{
       this.getApiStatus = status;
   }
   
   apiCall =  (requestObject) =>{
       const {
           setApiError,
           setApiStatus,
           setApiResponse
       } = this;
       const response =  this.apiCallFunction(requestObject);
       return bindPromiseWithOnSuccess(response)
       .to(setApiStatus,setApiResponse)
       .catch(setApiError);
   }
}

export default ApiCallModel;