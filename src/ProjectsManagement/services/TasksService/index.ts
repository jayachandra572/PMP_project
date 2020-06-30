import { APIProjectTasksRequest, APIProjectTasksResponse, APIPostProjectTaskRequest, APITaskStatusChangeRequest, APITaskStatusChangeResponse, APITaskValidateFieldsResponse, APITaskValidationFieldsRequest, APIPostTaskTransitionValidationRequest } from "../../stores/type";

interface TasksService{
    getProjectTaskAPI : (request:APIProjectTasksRequest) => Promise<APIProjectTasksResponse>
    postProjectTaskAPI : (request:APIPostProjectTaskRequest) => Promise<any>
    changeTaskStatusAPI : (request:APITaskStatusChangeRequest) => Promise<APITaskStatusChangeResponse>
    taskValidationFieldAPI : (request:APITaskValidationFieldsRequest) => Promise<APITaskValidateFieldsResponse>
    postTaskTransitionValidationAPI : (request:APIPostTaskTransitionValidationRequest) => Promise<any>
}

export default TasksService