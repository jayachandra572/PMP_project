import taskResponseData from '../../fixtures/taskResponseData.json'

class TasksService{
    
    getProjectTask(request){
      return new Promise((resolve, reject) => {
         setTimeout(()=> resolve(taskResponseData), 1000);
      });
    }
    
    postProjectTask (request){
        return new Promise((resolve, reject) => {
         setTimeout(()=> resolve(), 1000);
      });
    }
}

export default TasksService;