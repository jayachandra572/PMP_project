import ProjectModel from "."
import projectResponseData from "../../../fixtures/projectResponseData.json"


let projectModel:ProjectModel
let project = projectResponseData.projects[0]
describe("Project model test cases",()=>{
    beforeEach(()=>{
        projectModel = new ProjectModel(project)
    })
    it("should test constructor functionality of project model",()=>{
        expect(projectModel.id).toBe(project.id)
        expect(projectModel.name).toBe(project.name)
        expect(projectModel.workFlowType).toEqual(project.workflow_type)
        expect(projectModel.createdBy).toEqual(project.created_by)
        expect(projectModel.description).toBe(project.description)
        expect(projectModel.createdAt).toBe(project.created_at)
    })

})
