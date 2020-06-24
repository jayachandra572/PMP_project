import { resolveWithTimeout } from "../../../Common/utils/TestUtils"

import workFlowTypesResponse from '../../fixtures/workFlowTypesAPI.json'

import NewProjectService from "."

class NewProjectFixturesService implements NewProjectService {
   workFlowTypesAPI() {
      return resolveWithTimeout(workFlowTypesResponse)
   }

   postCreateProject() {
      return resolveWithTimeout("ok")
   }
}

export default NewProjectFixturesService
