import { APIProjectsRequest, APIProjectsResponse } from "../../stores/type";

interface ProjectsService {
    projectsAPI : (request:APIProjectsRequest) => Promise<APIProjectsResponse>
}

export default ProjectsService