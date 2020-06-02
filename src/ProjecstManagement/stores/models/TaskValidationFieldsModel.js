class TaskValidationFieldsModel{
    constructor(field){
        this.id = field.id;
        this.label = field.condition
        this.isMandatory = field.is_mandatory;
        this.value = this.default_value;
    }
    
    onChangeValue = () =>{
        this.value = !this.value;
    }
}
export default TaskValidationFieldsModel;