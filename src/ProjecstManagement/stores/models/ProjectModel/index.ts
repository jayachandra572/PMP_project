import { observable } from 'mobx'

type projectObject = {
   workflow_type:string
   created_by:object
   description:string
   created_at:string
   name:string
   id:string
}

class ProjectModel {
   id:string
   name:string
   workFlowType:string
   createdBy:object
   description:string
   createdAt:string
   constructor(project:projectObject) {
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
