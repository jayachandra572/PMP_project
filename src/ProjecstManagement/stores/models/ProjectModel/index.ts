import { ProjectObject } from "../../type"

class ProjectModel {
   id:string
   name:string
   workFlowType:object
   createdBy:object
   description:string
   createdAt:string
   constructor(project:ProjectObject) {
      const {
         workflow_type,
         created_by,
         description,
         created_at,
         name,
         id
      } = project
      this.id = id
      this.name = name
      this.workFlowType = workflow_type
      this.createdBy = created_by
      this.description = description
      this.createdAt = created_at
   }
}

export default ProjectModel
