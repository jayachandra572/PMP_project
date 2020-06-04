import { create } from 'apisauce'
import { networkCallWithApisauce } from '../../utils/APIUtils'
import { apiMethods } from '../../constants/APIConstants'

import serviceConstants from '../../constants/ServiceConstants'
import endPoints from '../endPoints'

class AuthService {
   constructor() {
      this.api = create({
         // baseURL:"https://f6e5ec5fa370.ngrok.io/api/lets_ride"
         baseURL: serviceConstants.baseURL
      });
   }
   
   

   signInAPI = request => {
      const {userName,userPassword} = request
      console.log(userName,userPassword,serviceConstants)
      const { api } = this
      return networkCallWithApisauce(
         api,
       endPoints.signAPI,
      // "/user/login/v1/",
         {
            username:userName,
            password:userPassword
         },
         apiMethods.post
      )
   }
}

export default AuthService
