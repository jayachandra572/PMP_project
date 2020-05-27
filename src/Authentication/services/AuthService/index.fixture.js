import userSignInResponse from '../../fixtures/getUserSignInResponse.json'

class AuthService {
   signInAPI(request) {
      return new Promise((resolve, reject) => {
         resolve(userSignInResponse)
      })
   }
}

export default AuthService
