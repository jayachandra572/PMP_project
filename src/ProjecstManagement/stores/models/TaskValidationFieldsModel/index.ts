import { observable } from 'mobx'
import { ValidationFieldObject } from "../../type"

class TaskValidationFieldsModel {
   @observable value:boolean
   id:string
   label:string
   isMandatory:boolean
   constructor(field:ValidationFieldObject) {
      this.id = field.id
      this.label = field.condition
      this.isMandatory = field.is_mandatory
      this.value = field.default_value
   }

   onClick = () => {
      const {value} =this
      this.value = !value
   }
}
export default TaskValidationFieldsModel
