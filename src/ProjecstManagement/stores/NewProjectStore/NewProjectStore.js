
import { API_INITIAL } from '@ib/api-constants'

import ApiCallModel from '../models/ApiCallModel'

class NewProjectStore {
   constructor(newProjectService) {
      this.newProjectService = newProjectService
      this.workFlowType = new ApiCallModel(newProjectService.workFlowTypesAPI)
      this.newProject = new ApiCallModel(newProjectService.postCreateProject)
   }
}

export default NewProjectStore
