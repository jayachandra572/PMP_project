import { observable } from 'mobx'
import { API_INITIAL } from '@ib/api-constants'

import ProjectService from "../../services/ProjectsService/index.api"

import PageNavigationStore from "../PageNavigationStore"

import ProjectModel from '../models/ProjectModel'

class ProjectsStore {
   @observable pageNavigation:PageNavigationStore
   pageLimit:number
   config:object
   projectsService : ProjectService
   
   constructor(projectsService: ProjectService, PageNavigation:any) {
      this.projectsService = projectsService
      this.pageLimit= 4
      this.config = {
         entities: 'projects',
         totalEntities: 'total_no_of_projects'
      }
      this.pageNavigation = new PageNavigation(
         projectsService.projectsAPI,
         ProjectModel,
         this.pageLimit,
         this.config
      )
   }

}
export default ProjectsStore
