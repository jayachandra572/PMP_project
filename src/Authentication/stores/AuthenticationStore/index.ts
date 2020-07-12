import { observable, action, computed } from 'mobx'
import { API_INITIAL, APIStatus } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import { getUserDisplayableErrorMessage } from '../../../Common/utils/APIUtils'
import {
   setAccessToken,
   getAccessToken,
   clearUserSession
} from '../../../Common/utils/StorageUtils'

import { setUserDetails } from '../../utils/LocalStrorageUtils'
import AuthService from '../../services/AuthService'
import { UserSignResponse, UserSignRequest } from '../types'

class AuthenticationStore {
   @observable getAuthApiStatus!: APIStatus
   @observable getAuthApiError!: null | Error
   @observable authApiToken?: string | undefined
   authService: AuthService
   constructor(authService: AuthService) {
      this.authService = authService
      this.init()
   }

   @action.bound
   init() {
      this.authApiToken = getAccessToken()
      this.getAuthApiStatus = API_INITIAL
      this.getAuthApiError = null
   }

   @action.bound
   setAuthApiStatus(status) {
      this.getAuthApiStatus = status
   }

   @action.bound
   setAuthApiError(error) {
      this.getAuthApiError = error
   }

   @action.bound
   setAuthApiResponse(response: UserSignResponse | null) {
      if (response) {
         const accessToken = response.access_token
         setAccessToken(accessToken)
         this.authApiToken = getAccessToken()
         setUserDetails(response)
      }
   }
   @action.bound
   userSignIn(request: UserSignRequest, onFailure: Function) {
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
            setAuthApiError(error)
            onFailure()
         })
   }

   @action.bound
   userLogOut() {
      clearUserSession()
      this.init()
   }

   @computed get isLogin(): boolean {
      const { authApiToken } = this
      return !(authApiToken === undefined || authApiToken === '')
   }
}

export default AuthenticationStore
