import { observable,reaction } from 'mobx'

import ApiCallModel from "../models/ApiCallModel";

import TaskModel from "../models/TaskModel"
class TasksStore {
    @observable projectTasks = []
    @observable tasks = {}
    constructor(tasksService){
        this.tasks = new ApiCallModel(tasksService.getProjectTask);
        this.postTask = new ApiCallModel(tasksService.postProjectTask);
    }
    
    reaction1 = reaction(
        ()=> this.tasks.getApiStatus,
        apiStatus=>{
            if(apiStatus===200){
                this.projectTasks = this.tasks.response.tasks.map(task=>{
                    return (new TaskModel(task));
                });
            }
        })
}

export default TasksStore;