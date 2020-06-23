
import { API_INITIAL } from '@ib/api-constants'

import ApiCallModel from '../models/ApiCallModel'
import NewProjectService from "../../services/NewProjectService/index.api"

class NewProjectStore {
   newProjectService:NewProjectService
   workFlowType:ApiCallModel
   newProject:ApiCallModel
   constructor(newProjectService:NewProjectService) {
      this.newProjectService = newProjectService
      this.workFlowType = new ApiCallModel(newProjectService.workFlowTypesAPI)
      this.newProject = new ApiCallModel(newProjectService.postCreateProject)
   }
}

export default NewProjectStore
