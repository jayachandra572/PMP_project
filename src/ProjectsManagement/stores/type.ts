import { Stream } from "stream"

export interface APIProjectsRequest {
    limit:number
    offset:number
}

export interface APIProjectTasksRequest{
    id:string
     offset:number, 
     limit:number
}

export interface  APIPostProjectRequest{
    projectName:string
    workFlowTypeId:string
    projectType:string
    projectDescription:string
 }

export interface APIPostProjectTaskRequest{
    projectId:string
    taskTitle:string
     issueType:string 
     description:string
}
export interface APITaskStatusChangeRequest{
    id:string
    status:string
}

export interface APITaskValidationFieldsRequest{
    id:string
    fromStatus:string
    toStatus:string
}

export interface APIPostTaskTransitionValidationRequest {
    fromStatus:string
     toStatus:string 
     validateArrayIds:Array<string>
    taskId:string 
}

export interface WorkFlowType {
    name:string
    id:string
}

export interface CreatedBy{
    id:number
    name:string
    profile_pic:string
}




export interface TaskObject{
    id:string
   title:string
   description:string
   state:string
   issue_type:string
   created_by:CreatedBy
   project:string
   created_at:string
}

export interface StatusObject{
    id:string
    name:string
}

export interface ValidationFieldObject {
    id:string,
    condition:string,
    is_mandatory:boolean,
    default_value:boolean
}

export interface WorkFlowObject {
    id:number
    name:string
}


export interface ProjectObject {
    workflow_type:any
    created_by:CreatedBy
    description:string
    created_at:string
    name:string
    id:string
}

export interface  APIProjectsResponse {
    projects:Array<ProjectObject>
    total_no_of_projects:number
}

export interface APIProjectTasksResponse{
    Tasks:Array<TaskObject>
    total_no_of_tasks:number

}

export type APITaskStatusChangeResponse = Array<StatusObject>

export type APITaskValidateFieldsResponse = Array<ValidationFieldObject>

export type APIWorkFlowTypesResponse = Array<WorkFlowObject>
