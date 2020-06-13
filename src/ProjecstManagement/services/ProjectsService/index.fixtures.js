import projectResponseData from '../../fixtures/projectResponseData.json'

class ProjectsService {
   projectsAPI(offset, limit) {
      const projects = projectResponseData.projects
         .slice()
         .splice(offset, limit)
      return new Promise((resolve, reject) => {
         setTimeout(() => resolve({ ...projectResponseData, projects }), 1000)
      })
   }
}

export default ProjectsService
