import { observable } from 'mobx'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import { API_INITIAL } from '@ib/api-constants'

class ApiCallModel {
   @observable getApiStatus:number = API_INITIAL
   @observable getApiError:null|Error = null
   @observable response:null|Array<any> = []
   apiCallFunction:Function
   constructor(apiCallFunction:Function) {
      this.apiCallFunction = apiCallFunction
   }
   
   setApiStatus = (status:number) => {
      this.getApiStatus = status
   }
   
   setApiResponse = (response:Array<any>) => {
      this.response = response
   }
   
   setApiError = (error) => {
      this.getApiError = error
   }

   apiCall = (requestObject:object):Promise<any> => {
      const { setApiError, setApiStatus, setApiResponse } = this
      const response:Promise<any> = this.apiCallFunction(requestObject)
      return bindPromiseWithOnSuccess(response)
         .to(setApiStatus, setApiResponse)
         .catch(setApiError)
   }
}

export default ApiCallModel
