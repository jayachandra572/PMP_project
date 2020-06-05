import { observable, action,reaction ,toJS} from 'mobx'
import { API_INITIAL } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

import {Project} from "../models/Project";

class ProjectsStore{
    @observable projects = []
    @observable getProjectsApiStatus = API_INITIAL
    @observable getProjectsApiError = null;
    @observable activePageNumber = 1
    @observable offset = 0;
    constructor(projectsService){
        this.projectsService = projectsService; 
        this.init();
    }
    
    init = () =>{
        this.totalNoOfProjects= 0;
        this.totalNumberOfPages = 1;
        this.projectsPerPage =4;
    }
    
    calculateTotalNumberOfPages = (totalNoOfProjects) =>{
        const {projectsPerPage} =this;
        this.totalNumberOfPages = Math.ceil(totalNoOfProjects/projectsPerPage);
    }
    
    @action.bound
    createProjectModels (projects) {
        console.log(projects)
        this.projects = projects.map((project)=>{
            
            return new Project(project);
            
        });
    }
 
    
    @action.bound
    setProjectsApiStatus(status) {
        console.log(status,"status")
      this.getProjectsApiStatus = status;
   }
   @action.bound
   setProjectsApiError(error) {
       console.log(error,"error")
      this.getProjectsApiError = error;
   }
   
    @action.bound
    setProjectsApiResponse(response) {
        console.log(response.projects,"response")
    const {projects,total_no_of_projects} = response;
     this.createProjectModels(projects);
     this.totalNoOfProjects = total_no_of_projects;
     this.calculateTotalNumberOfPages(total_no_of_projects);
   }
   
    @action.bound
   getProjectsFromAPi() {
      const {
         projectsService: { projectsAPI },
         setProjectsApiResponse,
         setProjectsApiError,
         setProjectsApiStatus,
         offset,
         projectsPerPage
      } = this;
      const projectsPromise = projectsAPI(offset,projectsPerPage);
      return bindPromiseWithOnSuccess(projectsPromise)
         .to(setProjectsApiStatus, setProjectsApiResponse)
         .catch(setProjectsApiError);
   }
   
    
    @action.bound
    navigateToNextPage () {
        const {totalNoOfProjects,projectsPerPage,offset} =this;
        if(totalNoOfProjects > offset+projectsPerPage ){
            this.offset += projectsPerPage;
            this.activePageNumber++;
        }
    } 
    
    
    @action.bound
    navigateToPreviousPage () {
        const {projectsPerPage,offset} =this;
        if(0 <= offset - projectsPerPage ){
            this.offset -= projectsPerPage;
            this.activePageNumber--;
        }
    }
    
    @action.bound
    onClickPageNumber(number){
        const {projectsPerPage} = this;
        this.activePageNumber = number;
        this.offset = (number-1)*projectsPerPage;
    }
    
    
    reaction1= reaction(()=>this.activePageNumber,
        activePageNumber=>{
            this.getProjectsFromAPi()});
    
}
export  default ProjectsStore;