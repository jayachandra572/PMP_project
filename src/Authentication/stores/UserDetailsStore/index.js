import { observable, action} from 'mobx'
import { API_INITIAL } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import {getUserDisplayableErrorMessage} from "../../utils/APIUtils"

class UserDetailsStore {
   @observable getUserDetailsApiStatus = API_INITIAL
   @observable getUserDetailsApiError = null
   @observable userDetails = null 

   constructor(authService) {
      this.authService = authService
   }

   @action.bound
   setUserDetailsApiStatus(status) {
      console.log(status)
      this.getAuthApiStatus = status
   }

   @action.bound
   setUserDetailsApiError(error) {
      this.getAuthApiError = getUserDisplayableErrorMessage(error);
   }

   @action.bound
   setUserDetailsApiResponse(response) {
      console.log(response,"response");
       this.userDetails = response;
   }
   @action.bound
   getUserDetailsApi() {
      const {
         authService: { getUserDetails },
         setUserDetailsApiStatus,
         setUserDetailsApiError,
         setUserDetailsApiResponse
      } = this;
      const userDetailsPromise = getUserDetails();
      return bindPromiseWithOnSuccess(userDetailsPromise)
         .to(setUserDetailsApiStatus, setUserDetailsApiResponse)
         .catch(error => setUserDetailsApiError );
   }
}

export default UserDetailsStore;
