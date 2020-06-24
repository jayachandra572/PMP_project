import getUserSignInResponse from '../../fixtures/getUserSignInResponse.json'
import userDetailsResponse from '../../fixtures/userDetailsResponse.json'
import AuthService from "."
import { resolveWithTimeout } from "../../../Common/utils/TestUtils"

class AuthAPIService implements AuthService {
   signInAPI() {
      return resolveWithTimeout( getUserSignInResponse)
   }
   getUserDetails = () => {
      return resolveWithTimeout(userDetailsResponse)
   }
}

export default AuthAPIService
