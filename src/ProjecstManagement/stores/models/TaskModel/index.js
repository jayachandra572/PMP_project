import {observable,action} from "mobx";
import { API_SUCCESS,API_INITIAL} from '@ib/api-constants';
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise';

class TaskModel {
    @observable stateOptions
    @observable getApiStatus =API_INITIAL;
    @observable getApiError = null
    @observable response = []
    
    constructor(task,changeTaskStatusAPI){
        this.id = task.id;
        this.project = task.project;
        this.issueType = task.issue_type;
        this.title = task.title;
        this.description = task.description;
        this.createdBy = task.created_by;
        this.createdAt = task.created_at;
        this.state =task.state;
        this.stateOptions = [{id:task.state,name:task.state}];
        this.changeTaskStatusAPI = changeTaskStatusAPI;
        this.previousTaskState = null;
        this.toStatus = null;
        
    }
    
    changeTaskState = (newState) =>{
        this.previousTaskState = this.state;
        this.state = newState;
    }
    
    
     setApiError = (error) =>{
     this.getApiError = error;
   }
   
   @action.bound
    setApiResponse  (response){
    console.log(response)
    if(response.findIndex(option=>option.name===this.state) === -1){
        response.unshift({id:this.state,name:this.state});
    }
 
    
    this.stateOptions = response;
    this.response = response;
   }
   setApiStatus = (status) =>{
       this.getApiStatus = status;
   }
   
   getStatusTransitionOptions =  () =>{
      const {
          setApiError,
          setApiStatus,
          setApiResponse,
          state,
      } = this;
        const response =  this.changeTaskStatusAPI(state);
        return bindPromiseWithOnSuccess(response)
        .to(setApiStatus,setApiResponse)
        .catch(setApiError);
   }
    
    
}

export default TaskModel;