import { create } from 'apisauce'
import { networkCallWithApisauce } from '../../../Common/utils/APIUtils'
import { apiMethods } from '../../constants/APIConstants'

import serviceConstants from '../../constants/ServiceConstants'
import endPoints from '../endPoints'

class AuthService {
   api:any
   constructor() {
      this.api = create({
         baseURL: serviceConstants.baseURL
      })
   }

   signInAPI = request => {
      const { userName, userPassword } = request
      console.log(userName, userPassword, serviceConstants)
      const { api } = this
      return networkCallWithApisauce(
         api,
         endPoints.signAPI,
         {
            username: userName,
            password: userPassword
         },
         apiMethods.post
      )
   }

   getUserDetails = () => {
      const { api } = this
      return networkCallWithApisauce(
         api,
         endPoints.userDetailsAPI,
         {},
         apiMethods.get
      )
   }
}

export default AuthService
