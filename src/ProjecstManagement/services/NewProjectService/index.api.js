import {create} from "apisauce";
import {networkCallWithApisauce} from "../../../Common/utils/APIUtils";
import {apiMethods} from "../../../Common/constants/APIConstants";

import ServiceConstants from "../../constants/ServiceConstants";
import {getWorkFlowTypes,createProject,} from "../EndPoints";

class TasksService{
    constructor(){
        this.api=create({
            baseURL:ServiceConstants.baseURL
            // baseURL:"https://995e9c4b815f.ngrok.io/api/project_management_portal"
        });
    }
    postCreateProject=(projectObject)=>{
        const {projectName,workFlowTypeId,projectType,projectDescription} = projectObject;
        const requestObj = {
            name:projectName,
            description:projectDescription,
            workflow_type:workFlowTypeId,
            project_type:projectType
        };
        const {api} = this;
        return networkCallWithApisauce(api,createProject,requestObj,apiMethods.post);
    }
    
    workFlowTypesAPI = () =>{
        console.log(ServiceConstants)
        const {api} = this;
        return networkCallWithApisauce(api,getWorkFlowTypes,{},apiMethods.get);
    }
}

export default TasksService;