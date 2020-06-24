import { observable, action } from 'mobx'
import { API_INITIAL ,APIStatus} from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import { getUserDisplayableErrorMessage } from '../../../Common/utils/APIUtils'
import AuthService from "../../services/AuthService"
import {UserDetails} from "../types"


class UserDetailsStore {
   @observable getUserDetailsApiStatus:APIStatus = API_INITIAL
   @observable getUserDetailsApiError:Error|null = null
   @observable userDetails!:UserDetails
   authService:AuthService

   constructor(authService:AuthService) {
      this.authService = authService
   }

   @action.bound
   setUserDetailsApiStatus(status) {
      this.getUserDetailsApiStatus = status
   }

   @action.bound
   setUserDetailsApiError(error) {
      this.getUserDetailsApiError = error
   }

   @action.bound
   setUserDetailsApiResponse(response:UserDetails|null) {
      if(response){
         this.userDetails = response
         }      
      }
   @action.bound
   getUserDetailsApi() {
      const {
         authService: { getUserDetails },
         setUserDetailsApiStatus,
         setUserDetailsApiError,
         setUserDetailsApiResponse
      } = this
      const userDetailsPromise = getUserDetails()
      return bindPromiseWithOnSuccess(userDetailsPromise)
         .to(setUserDetailsApiStatus, setUserDetailsApiResponse)
         .catch(setUserDetailsApiError)
   }
}

export default UserDetailsStore
