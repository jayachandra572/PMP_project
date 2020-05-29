import { observable } from 'mobx'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise';
import { API_INITIAL } from '@ib/api-constants';

import ApiCallModel from "../models/ApiCallModel";

class NewProjectStore{
    @observable getNewProjectApiStatus = API_INITIAL
    @observable getNewProjectApiError = null;
    
    constructor(newProjectService){
        this.newProjectService  = newProjectService;
        this.workFlowType = new ApiCallModel(newProjectService.workFlowTypesAPI);
        this.newProject = new ApiCallModel(newProjectService.postCreateProject);
    }
}

export default NewProjectStore;