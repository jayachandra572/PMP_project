import { observable,reaction } from 'mobx';
import { API_SUCCESS} from '@ib/api-constants'

import ApiCallModel from "../models/ApiCallModel";

import TaskModel from "../models/TaskModel";
class TasksStore {
    @observable projectTasks = []
    @observable tasks = {}
    constructor(tasksService){
        this.tasksService = tasksService
        this.tasks = new ApiCallModel(tasksService.getProjectTask);
        this.postTask = new ApiCallModel(tasksService.postProjectTask);
    }
    
    reaction1 = reaction(
        ()=> this.tasks.getApiStatus,
        apiStatus=>{
            if(apiStatus===API_SUCCESS){
                console.log(this.changeTaskStatusStore)
                this.projectTasks = this.tasks.response.tasks.map(task=>{
                    return (new TaskModel(task,this.tasksService.changeTaskStatusAPI));
                });
            }
        })
}

export default TasksStore;