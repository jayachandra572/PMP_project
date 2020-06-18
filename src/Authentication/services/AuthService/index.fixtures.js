import getUserSignInResponse from '../../fixtures/getUserSignInResponse.json'
import userDetailsResponse from "../../fixtures/userDetailsResponse.json"

class AuthService {
   signInAPI(request) {
      return new Promise((resolve, reject) => {
         setTimeout(()=> {
            resolve(getUserSignInResponse)
         }, 1000)
      })
   }
   getUserDetails = () => {
     return new Promise((resolve, reject) => {
         setTimeout(() => resolve(userDetailsResponse), 1000)
      })
   }
}

export default AuthService
