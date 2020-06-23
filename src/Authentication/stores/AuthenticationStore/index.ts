import { observable, action, computed } from 'mobx'
import { API_INITIAL } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import { getUserDisplayableErrorMessage } from '../../../Common/utils/APIUtils'
import {
   setAccessToken,
   getAccessToken,
   clearUserSession
} from '../../../Common/utils/StorageUtils'

import { setUserDetails } from '../../utils/LocalStrorageUtils'
import AuthService from "../../services/AuthService/index.fixtures"

type signResponse ={
   access_token:string
   user_id:string
   name:string
   expires_in:string
   is_admin:boolean
}


type requestObjectType = {
   userName:string
   userPassword:string
}

class AuthenticationStore {
   @observable getAuthApiStatus:number = API_INITIAL
   @observable getAuthApiError:null|string = null
   @observable authApiToken?:string|undefined
   authService:AuthService
   constructor(authService:AuthService) {
      this.authService = authService
      this.init()
   }

   @action.bound
   init() {
      this.authApiToken = getAccessToken()
   }

   @action.bound
   setAuthApiStatus(status:number) {
      this.getAuthApiStatus = status
   }

   @action.bound
   setAuthApiError(error:object) {
      this.getAuthApiError = getUserDisplayableErrorMessage(error)
   }

   @action.bound
   setAuthApiResponse(response:any) {
      const accessToken = response.access_token
      setAccessToken(accessToken)
      this.authApiToken = getAccessToken()
      setUserDetails(response)
   }
   @action.bound
   userSignIn(request:requestObjectType, onFailure:Function):Promise<any> {
      const {
         authService: { signInAPI },
         setAuthApiResponse,
         setAuthApiError,
         setAuthApiStatus
      } = this
      const signPromise = signInAPI(request)
      return bindPromiseWithOnSuccess(signPromise)
         .to(setAuthApiStatus, setAuthApiResponse)
         .catch(error => {setAuthApiError(error); onFailure()})
   }

   @action.bound
   userLogOut() {
      clearUserSession()
      this.init()
   }

   @computed get isLogin():boolean {
      const { authApiToken } = this
      return !(authApiToken === undefined || authApiToken === '')
   }
}

export default AuthenticationStore
