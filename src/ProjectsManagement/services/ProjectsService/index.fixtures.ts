import projectResponseData from '../../fixtures/projectResponseData.json'
import { resolveWithTimeout } from "../../../Common/utils/TestUtils"
import ProjectsService from "."

class ProjectsAPIService implements ProjectsService  {
   projectsAPI(request) {
      const { limit, offset } = request
      const projects = projectResponseData.projects
         .slice()
         .splice(offset, limit)
      return resolveWithTimeout({ ...projectResponseData, projects })
   }
}

export default ProjectsAPIService
