import { create } from 'apisauce'

import { networkCallWithApisauceWithAccessToken } from '../../../Common/utils/APIUtils'
import { apiMethods } from '../../../Common/constants/APIConstants'

import ServiceConstants from '../../constants/ServiceConstants'


class ProjectsService {
   api:object
   constructor() {
      this.api = create({
         baseURL: ServiceConstants.baseURL
      })
   }
   projectsAPI = request => {
      const { api } = this
      const { limit, offset } = request
      const params = `?offset=${offset}&limit=${limit}`
      const endPoint = '/projects/v1/' + params
      return networkCallWithApisauceWithAccessToken(
         api,
         endPoint,
         {},
         apiMethods.get
      )
   }
}

export default ProjectsService
