import userSignInResponse from '../../fixtures/getUserSignInResponse.json'

class AuthService {
   signInAPI(request) {
      return new Promise((resolve, reject) => {
         setTimeout(function() {resolve(userSignInResponse)}, 1000);
      })
   }
}

export default AuthService
