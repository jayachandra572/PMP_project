import { observable,reaction } from 'mobx';
import { API_SUCCESS} from '@ib/api-constants'

import ApiCallModel from "../models/ApiCallModel/index";
import TaskModel from "../models/TaskModel";
import TaskValidationFieldsModel from "../models/TaskValidationFieldsModel";


class TasksStore {
    @observable projectTasks = []
    @observable tasks = {}
    @observable taskValidationField = {};
    constructor(tasksService){
        this.tasksService = tasksService;
        this.tasks = new ApiCallModel(tasksService.getProjectTaskAPI);
        this.postTask = new ApiCallModel(tasksService.postProjectTaskAPI);
        this.taskValidationField = new ApiCallModel(tasksService.taskValidationFieldAPI);
    }
    
    projectTasksReaction = reaction(
        ()=> this.tasks.getApiStatus,
        apiStatus=>{
            if(apiStatus===API_SUCCESS){
                this.projectTasks = this.tasks.response.tasks.map(task=>{
                    return (new TaskModel(task,this.tasksService.changeTaskStatusAPI));
                });
            }
        })
    taskFieldsReaction = reaction(
        ()=> this.taskValidationField.getApiStatus,
        apiStatus=>{
            if(apiStatus===API_SUCCESS){
                this.taskValidationField.response = observable(this.taskValidationField.response.map(eachField=>{
                    return (new TaskValidationFieldsModel(eachField));
                })); 
            }
        })
}

export default TasksStore;