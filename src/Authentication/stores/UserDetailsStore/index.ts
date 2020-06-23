import { observable, action } from 'mobx'
import { API_INITIAL } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import { getUserDisplayableErrorMessage } from '../../../Common/utils/APIUtils'
import AuthService from "../../services/AuthService/index.fixtures"


class UserDetailsStore {
   @observable getUserDetailsApiStatus:number = API_INITIAL
   @observable getUserDetailsApiError:null|string = null
   @observable userDetails:null|Object = null
   authService:AuthService

   constructor(authService:AuthService) {
      this.authService = authService
   }

   @action.bound
   setUserDetailsApiStatus(status:number):void {
      this.getUserDetailsApiStatus = status
   }

   @action.bound
   setUserDetailsApiError(error:object):void {
      this.getUserDetailsApiError = getUserDisplayableErrorMessage(error)
   }

   @action.bound
   setUserDetailsApiResponse(response:object):void {
      this.userDetails = response
   }
   @action.bound
   getUserDetailsApi() {
      const {
         authService: { getUserDetails },
         setUserDetailsApiStatus,
         setUserDetailsApiError,
         setUserDetailsApiResponse
      } = this
      const userDetailsPromise:Promise<any> = getUserDetails()
      return bindPromiseWithOnSuccess(userDetailsPromise)
         .to(setUserDetailsApiStatus, setUserDetailsApiResponse)
         .catch(setUserDetailsApiError)
   }
}

export default UserDetailsStore
