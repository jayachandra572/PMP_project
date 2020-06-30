import { APIPostProjectRequest, APIWorkFlowTypesResponse } from "../../stores/type";

interface NewProjectService {
    postCreateProject : (request:APIPostProjectRequest) => Promise<any>
    workFlowTypesAPI:() => Promise<APIWorkFlowTypesResponse>
}
export default NewProjectService