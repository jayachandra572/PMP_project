import { observable, action } from 'mobx'
import { API_INITIAL ,APIStatus} from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import { getUserDisplayableErrorMessage } from '../../../Common/utils/APIUtils'
import AuthService from "../../services/AuthService"
import {UserDetails} from "../types"


class UserDetailsStore {
   @observable getUserDetailsApiStatus!:APIStatus 
   @observable getUserDetailsApiError!:Error|null 
   @observable userDetails!:UserDetails
   authService:AuthService

   constructor(authService:AuthService) {
      this.authService = authService
      this.init()
   }

   @action.bound
   init(){
      this.getUserDetailsApiError = null
      this.getUserDetailsApiStatus = API_INITIAL
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

   @action.bound
   clearStore(){
      this.init()
   }
}

export default UserDetailsStore
