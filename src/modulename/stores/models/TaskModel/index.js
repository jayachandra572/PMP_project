import {observable,action,reaction} from "mobx";
import { API_SUCCESS,API_INITIAL} from '@ib/api-constants';
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise';
import ApiCallModel from "../ApiCallModel";

class TaskModel {
    @observable stateOptions
    @observable getApiStatus =API_INITIAL;
    @observable getApiError = null
    @observable response = []
    @observable state
    
    constructor(task,changeTaskStatusAPI,postTaskTransitionValidationAPI){
        this.taskTrasitionState = new ApiCallModel(postTaskTransitionValidationAPI)
        this.id = task.id;
        this.issueType = task.issue_type;
        this.title = task.title;
        this.description = task.description;
        this.createdBy = task.created_by;
        this.createdAt = task.created_at;
        this.state =task.state;
        this.stateOptions = [{id:task.state,name:task.state}];
        this.changeTaskStatusAPI = changeTaskStatusAPI;
        this.toStatus = null;
    }
    
    
    changeTaskStateReaction = reaction(
        ()=>this.taskTrasitionState.getApiStatus,
        apiStatus=>{
            if(apiStatus===API_SUCCESS){
                alert(this.toStatus)
                this.state = this.toStatus;
            }
        })
    
    
     setApiError = (error) =>{
     this.getApiError = error;
   }
   
   @action.bound
    setApiResponse  (response){
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