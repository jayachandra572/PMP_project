import { create } from 'apisauce'
import { networkCallWithApisauceWithAccessToken } from '../../../Common/utils/APIUtils'
import { apiMethods } from '../../../Common/constants/APIConstants'

import ServiceConstants from '../../constants/ServiceConstants'
import { getWorkFlowTypesEndPoint, createProjectEndPoint } from '../EndPoints'

class TasksService {
   constructor() {
      this.api = create({
         baseURL: ServiceConstants.baseURL
         // baseURL:"https://995e9c4b815f.ngrok.io/api/project_management_portal"
      })
   }
   postCreateProject = projectObject => {
      const {
         projectName,
         workFlowTypeId,
         projectType,
         projectDescription
      } = projectObject
      const requestObj = {
         name: projectName,
         description: projectDescription,
         workflow_type: workFlowTypeId,
         project_type: projectType
      }
      const { api } = this
      return networkCallWithApisauceWithAccessToken(
         api,
         createProjectEndPoint,
         requestObj,
         apiMethods.post
      )
   }

   workFlowTypesAPI = () => {
      console.log(ServiceConstants)
      const { api } = this
      return networkCallWithApisauceWithAccessToken(
         api,
         getWorkFlowTypesEndPoint,
         {},
         apiMethods.get
      )
   }
}

export default TasksService
