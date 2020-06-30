import taskValidateFieldResponse from "../../../fixtures/taskValidateFieldResponse.json"
import TaskValidationFieldsModel from "."


let valiadateField = taskValidateFieldResponse[0]
let taskValidationFieldsModel:TaskValidationFieldsModel 

describe("Task Validation Fields Model test cases",()=>{
    beforeEach(()=>{
        taskValidationFieldsModel = new TaskValidationFieldsModel(valiadateField)
    })
    it("should test TaskValidationFieldsModel constructor functionality",()=>{
            expect(taskValidationFieldsModel.id).toBe(valiadateField.id)
            expect(taskValidationFieldsModel.label).toBe(valiadateField.condition)
            expect(taskValidationFieldsModel.isMandatory).toBe(valiadateField.is_mandatory)
            expect(taskValidationFieldsModel.value).toBe(valiadateField.default_value)
    })

    it("should test Task TaskValidationFieldsModel onClick method",()=>{
        taskValidationFieldsModel.value = false
        taskValidationFieldsModel.onClick()
        expect(taskValidationFieldsModel.value).toBe(true)
    })
})
