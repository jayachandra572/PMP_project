import {create} from "apisauce";
import {networkCallWithApisauce} from "../../../Common/utils/APIUtils";
import {apiMethods} from "../../../Common/constants/APIConstants";

import APIService from "../../constants/APIService";
import {postProject,getWorkFlowTypes} from "../EndPoints";

class TasksService{
    constructor(){
        this.api=create({
            baseURL:APIService.baseUrl
        });
    }
    postCreateProject=(projectObject)=>{
        const {api} = this;
        return networkCallWithApisauce(api,postProject,projectObject,apiMethods.post);
    }
    
    workFlowTypesAPI = () =>{
        const {api} = this;
        return networkCallWithApisauce(api,postProject,{},apiMethods.get);
    }
}

export default TasksService;