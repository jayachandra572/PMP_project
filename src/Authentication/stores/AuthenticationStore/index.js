import { observable, action, toJS } from 'mobx'
import { API_INITIAL } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import { getUserDisplayableErrorMessage } from '../../utils/APIUtils'
import { setUserDetails } from '../../utils/LocalStrorageUtils'

import {
   setAccessToken,
   getAccessToken,
   clearUserSession
} from '../../utils/StorageUtils'

class AuthenticationStore {
   @observable getAuthApiStatus = API_INITIAL
   @observable getAuthApiError = null
   @observable authApiToken

   constructor(authService) {
      this.authService = authService
      this.init()
   }

   @action.bound
   init() {
      this.authApiToken = getAccessToken()
   }

   @action.bound
   setAuthApiStatus(status) {
      this.getAuthApiStatus = status
   }

   @action.bound
   setAuthApiError(error) {
      this.getAuthApiError = getUserDisplayableErrorMessage(error)
   }

   @action.bound
   setAuthApiResponse(response) {
      const accessToken = response.access_token
      setAccessToken(accessToken)
      this.authApiToken = getAccessToken()
      setUserDetails(response)
   }
   @action.bound
   userSignIn(request, onFailure) {
      const {
         authService: { signInAPI },
         setAuthApiResponse,
         setAuthApiError,
         setAuthApiStatus
      } = this
      const signPromise = signInAPI(request)
      return bindPromiseWithOnSuccess(signPromise)
         .to(setAuthApiStatus, setAuthApiResponse)
         .catch(error => {
            setAuthApiError(error), onFailure()
         })
   }

   @action.bound
   userLogOut() {
      clearUserSession()
      this.init()
   }
}

export default AuthenticationStore
