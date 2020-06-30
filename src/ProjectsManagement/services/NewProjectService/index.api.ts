import { create } from 'apisauce'
import { networkCallWithApisauceWithAccessToken } from '../../../Common/utils/APIUtils'
import { apiMethods } from '../../../Common/constants/APIConstants'

import environmentConstants from '../../constants/environmentConstants'
import { getWorkFlowTypesEndPoint, createProjectEndPoint } from '../EndPoints'

import NewProjectService from "."


class NewProjectAPIService implements NewProjectService {
   api:Record<string,any>
   constructor() {
      this.api = create({
         baseURL: environmentConstants.BASE_URL
      })
   }
   postCreateProject = (projectObject) => {
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

   workFlowTypesAPI = ()  => {
      const { api } = this
      return networkCallWithApisauceWithAccessToken(
         api,
         getWorkFlowTypesEndPoint,
         {},
         apiMethods.get
      )
   }
}

export default NewProjectAPIService
