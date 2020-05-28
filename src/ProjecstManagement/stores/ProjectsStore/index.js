import { observable, action } from 'mobx'
import { API_INITIAL } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

class ProjectsStore{
    @observable projects = []
    @observable getProjectsApiStatus = API_INITIAL
    @observable getProjectsApiError = null;
    constructor(projectsService){
        this.projectsService = projectsService; 
        this.init();
    }
    
    init = () =>{
        this.totalNoOfProducts = 0;
    }
    
    @action.bound
    setProjectsApiStatus(status) {
      this.getProjectsApiStatus = status
   }
   @action.bound
   setProjectsApiError(error) {
      this.getProjectsApiError = error
   }
   
    @action.bound
   setProjectsApiResponse(response) {
     this.projects = response.projects;
     this.totalNoOfProducts = response.total_no_of_projects;
   }
   
    @action.bound
   getProjectsFromAPi() {
      const {
         projectsService: { projectsAPI },
         setProjectsApiResponse,
         setProjectsApiError,
         setProjectsApiStatus
      } = this;
      const projectsPromise = projectsAPI();
      return bindPromiseWithOnSuccess(projectsPromise)
         .to(setProjectsApiStatus, setProjectsApiResponse)
         .catch(setProjectsApiError);
   }
}

export  default ProjectsStore;