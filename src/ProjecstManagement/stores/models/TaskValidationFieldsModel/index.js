import { observable } from 'mobx'
class TaskValidationFieldsModel {
   @observable value
   constructor(field) {
      this.id = field.id
      this.label = field.condition
      this.isMandatory = field.is_mandatory
      this.value = false
   }

   onClick = () => {
      this.value = !this.value
   }
}
export default TaskValidationFieldsModel
