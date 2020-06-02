import taskResponseData from '../../fixtures/taskResponseData.json'
import taskStatusChangeResponse from "../../fixtures/taskStatusChangeResponse.json"
import taskValidateFieldResponse from "../../fixtures/taskValidateFieldResponse.json"


class TasksService{
    getProjectTaskAPI(request){
      return new Promise((resolve) => {
         setTimeout(()=> resolve(taskResponseData), 1000);
      });
    }
    
    postProjectTaskAPI (request){
        return new Promise((resolve) => {
         setTimeout(()=> resolve(), 1000);
      });
    }
    
    changeTaskStatusAPI = (toStatus) =>{
        return new Promise((resolve) => {
         setTimeout(()=> resolve(taskStatusChangeResponse), 1000);
      });
    }
    
    taskValidationFieldAPI = (request) =>{
        console.log(request);
        return new Promise((resolve) => {
         setTimeout(()=> resolve(taskValidateFieldResponse), 2000);
      });
    }
}

export default TasksService;