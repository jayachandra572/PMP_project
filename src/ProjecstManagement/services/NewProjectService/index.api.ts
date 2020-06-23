import { create } from 'apisauce'
import { networkCallWithApisauceWithAccessToken } from '../../../Common/utils/APIUtils'
import { apiMethods } from '../../../Common/constants/APIConstants'

import ServiceConstants from '../../constants/ServiceConstants'
import { getWorkFlowTypesEndPoint, createProjectEndPoint } from '../EndPoints'

type requestObject={
   projectName:string
   workFlowTypeId:string
   projectType:string
   projectDescription:string
}

class TasksService {
   api:object
   constructor() {
      this.api = create({
         baseURL: ServiceConstants.baseURL
      })
   }
   postCreateProject = (projectObject:requestObject):Promise<any> => {
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

   workFlowTypesAPI = () :Promise<any> => {
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
