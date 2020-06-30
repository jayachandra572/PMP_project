import { observable } from 'mobx'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import { APIStatus } from '@ib/api-constants'

class CLASS_NAME {
   @observable getItemAPIStatus
   @observable getItemAPIError
   @observable response

   constructor() {}

   setAPIStatus = status => {
      this.getItemAPIStatus = status
   }

   setAPIResponse = response => {
      if (response) {
         this.response = response
      }
   }

   getItemsFromAPI = () => {
      const { setAPIError, setAPIStatus, setAPIResponse } = this
      const response = this.apiFunction()
      return bindPromiseWithOnSuccess(response)
         .to(setAPIStatus, setAPIResponse)
         .catch(setAPIError)
   }

   setAPIError = error => {
      this.getItemAPIError = error
   }
}

export default CLASS_NAME
