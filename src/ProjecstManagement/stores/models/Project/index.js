import {observable} from "mobx";


class Project {
    @observable taskStore
    constructor(project){
        const {workflow_type,created_by,description,created_at,name,id} = project;
        this.id = id;
        this.name = name;
        this.workFlowType = workflow_type;
        this.createdBy = created_by;
        this.description = description;
        this.createdAt = created_at;
    }
}

export {Project};