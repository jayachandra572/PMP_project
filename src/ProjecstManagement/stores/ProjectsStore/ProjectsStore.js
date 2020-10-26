import { observable } from 'mobx'
import { API_INITIAL } from '@ib/api-constants'

import ProjectModel from '../models/ProjectModel'

class ProjectsStore {
   @observable pageNavigation = null
   constructor(projectsService, PageNavigationStore) {
      this.projectsService = projectsService
      this.pageLimit = 10
      this.config = {
         entities: 'projects',
         totalEntities: 'total_no_of_projects'
      }
      this.pageNavigation = new PageNavigationStore(
         projectsService.projectsAPI,
         ProjectModel,
         this.pageLimit,
         this.config
      )
   }

}
export default ProjectsStore
