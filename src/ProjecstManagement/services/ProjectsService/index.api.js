import { create } from 'apisauce'
import { networkCallWithApisauce } from '../../../Common/utils/APIUtils'
import { apiMethods } from '../../../Common/constants/APIConstants'

import ServiceConstants from '../../constants/ServiceConstants'
import { projects } from '../EndPoints'

class ProjectsService {
   constructor() {
      this.api = create({
         baseURL: ServiceConstants.baseURL
      })
   }
   projectsAPI = (offset, limit) => {
      console.log(offset, limit)
      const { api } = this
      const params = `?offset=${offset}&limit=${limit}`
      const endPoint = '/projects/v1/' + params
      return networkCallWithApisauce(api, endPoint, {}, apiMethods.get)
   }
}

export default ProjectsService
