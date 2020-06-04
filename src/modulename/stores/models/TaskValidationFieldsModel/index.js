import {observable} from "mobx"
class TaskValidationFieldsModel{
    @observable value
    constructor(field){
        this.id = field.id;
        this.label = field.condition
        this.isMandatory = field.is_mandatory;
        this.value = field.default_value;
    }
    
    onClick = () =>{
        this.value = !this.value;
    }
}
export default TaskValidationFieldsModel;