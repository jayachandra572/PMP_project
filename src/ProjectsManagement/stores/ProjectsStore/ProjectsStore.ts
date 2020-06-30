import { observable, action } from 'mobx'

import ProjectService from "../../services/ProjectsService"

import PageNavigationStore from "../PageNavigationStore"
import ProjectModel from '../models/ProjectModel'

type Instantiable = {new(...args: any[]):any}

class ProjectsStore {
   @observable pageNavigation!:PageNavigationStore
   pageLimit:number
   config:object
   projectsService : ProjectService
   
   constructor(projectsService: ProjectService, PageNavigation:Instantiable) {
      this.projectsService = projectsService
      this.pageLimit= 4
      this.config = {
         entities: 'projects',
         totalEntities: 'total_no_of_projects'
      }
      this.pageNavigation = new PageNavigation( projectsService.projectsAPI,
         ProjectModel,
         this.pageLimit,
         this.config)
   }

   @action.bound   
   clearStore (){
      this.pageNavigation.clearStore()
   }

 

}
export default ProjectsStore
