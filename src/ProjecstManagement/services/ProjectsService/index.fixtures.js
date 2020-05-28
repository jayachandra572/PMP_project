import projectResponseData from '../../fixtures/projectResponseData.json'

class ProjectsService {
   projectsAPI() {
      return new Promise((resolve, reject) => {
         resolve(projectResponseData)
      })
   }
}

export default ProjectsService