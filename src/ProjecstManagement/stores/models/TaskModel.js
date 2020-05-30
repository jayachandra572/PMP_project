class TaskModel {
    constructor(task){
        this.project = task.project
        this.issueType = task.issue_type
        this.title = task.title
        this.description = task.description
        this.createdBy = task.created_by
        this.createdAt = task.created_at
        this.state = task.state
    }
}

export default TaskModel;