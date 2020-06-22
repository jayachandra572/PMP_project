import { observable } from 'mobx'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import { API_INITIAL } from '@ib/api-constants'

class ApiCallModel {
   @observable getApiStatus = API_INITIAL
   @observable getApiError = null
   @observable response = []
   constructor(apiCallFunction) {
      this.apiCallFunction = apiCallFunction
   }
   
   setApiStatus = status => {
      this.getApiStatus = status
   }
   
   setApiResponse = response => {
      this.response = response
   }
   
   setApiError = error => {
      this.getApiError = error
   }

   apiCall = requestObject => {
      const { setApiError, setApiStatus, setApiResponse } = this
      const response = this.apiCallFunction(requestObject)
      return bindPromiseWithOnSuccess(response)
         .to(setApiStatus, setApiResponse)
         .catch(setApiError)
   }
}

export default ApiCallModel
