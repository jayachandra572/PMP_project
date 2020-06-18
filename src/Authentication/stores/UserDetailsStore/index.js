import { observable, action } from 'mobx'
import { API_INITIAL } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import { getUserDisplayableErrorMessage } from '../../../Common/utils/APIUtils'

class UserDetailsStore {
   @observable getUserDetailsApiStatus = API_INITIAL
   @observable getUserDetailsApiError = null
   @observable userDetails = null

   constructor(authService) {
      this.authService = authService
   }

   @action.bound
   setUserDetailsApiStatus(status) {
      this.getUserDetailsApiStatus = status
   }

   @action.bound
   setUserDetailsApiError(error) {
      this.getUserDetailsApiError = getUserDisplayableErrorMessage(error)
   }

   @action.bound
   setUserDetailsApiResponse(response) {
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
      const userDetailsPromise = getUserDetails()
      return bindPromiseWithOnSuccess(userDetailsPromise)
         .to(setUserDetailsApiStatus, setUserDetailsApiResponse)
         .catch(setUserDetailsApiError)
   }
}

export default UserDetailsStore
