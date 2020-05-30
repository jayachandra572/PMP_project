import {create} from "apisauce";
import {networkCallWithApisauce} from "../../../Common/utils/APIUtils";
import {apiMethods} from "../../../Common/constants/APIConstants";

import APIService from "../../constants/APIService";
import {Tasks,postProjectTask} from "../EndPoints";

class TasksService{
    constructor(){
        this.api=create({
            baseURL:APIService.baseUrl
        });
    }
    getProjectTask=(projectId)=>{
        const {api} = this;
        return networkCallWithApisauce(api,Tasks,{projectId},apiMethods.get);
    }
    
    postProjectTask = (taskRequest)=>{
         const {api} = this;
        return networkCallWithApisauce(api,postProjectTask,{taskRequest},apiMethods.post)
    }
}

export default TasksService;