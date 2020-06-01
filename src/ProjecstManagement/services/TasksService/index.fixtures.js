import taskResponseData from '../../fixtures/taskResponseData.json'
import taskStatusChangeResponse from "../../fixtures/taskStatusChangeResponse.json"

class TasksService{
    
    getProjectTask(request){
      return new Promise((resolve) => {
         setTimeout(()=> resolve(taskResponseData), 1000);
      });
    }
    
    postProjectTask (request){
        return new Promise((resolve) => {
         setTimeout(()=> resolve(), 1000);
      });
    }
    
    changeTaskStatusAPI = (toStatus) =>{
        return new Promise((resolve) => {
         setTimeout(()=> resolve(taskStatusChangeResponse), 1000);
      });
    }
}

export default TasksService;