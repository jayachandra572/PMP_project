
import ApiCallModel from '../models/ApiCallModel'
import NewProjectService from "../../services/NewProjectService"

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
