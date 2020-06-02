import React , {Component} from "react"

import {CreatedBy} from "../CreatedBy"
import {observable} from "mobx"
import {observer} from "mobx-react"

import {TaskStateMenu} from "./TaskStateMenu";
import {IssueType,Title,Description,CreatedAt,TaskContainer} from "./styleComponent";

@observer
class EachTask extends Component{
    @observable modalOpen = false
    
    onChangeState =(event,data)=>{
        this.props.task.fromStatus = data.value;
        this.getValidateFields();
        this.handleOpen();
        this.props.task.changeTaskState(data.value);
    }
    
    getValidateFields = () =>{
        const {taskValidationField,task:{state,fromStatus}} = this.props;
        taskValidationField.apiCall({toStatus:state,fromStatus:fromStatus});
        console.log(taskValidationField.getApiStatus,"jsdngjkngkjsngk")
    }
    
    onClickStateMenu = (event,data)=>{
        const {task:{getStatusTransitionOptions}} = this.props;
        getStatusTransitionOptions();
    }
    
    handleOpen = () => this.modalOpen= true 
    handleClose = () => this.modalOpen = false
    
    render(){
        const {index,taskValidationField} = this.props;
        const {issueType,title,description,createdBy,createdAt,
        state,stateOptions,getApiStatus} = this.props.task;
        const {getValidateFields,onChangeState,handleClose,modalOpen,onClickStateMenu} =this;
        const isOdd = index%2 ===1;
        return(
                <TaskContainer isOdd = {isOdd} >
                    <IssueType>{issueType}</IssueType>
                    <Title>{title}</Title>
                    <CreatedBy name = {createdBy} />
                    <Description>{description}</Description>
                    <CreatedAt>{createdAt}</CreatedAt>
                    <TaskStateMenu 
                        taskValidationField = {taskValidationField}
                        onChangeState = {onChangeState} 
                        onClickStateMenu = {onClickStateMenu}
                        options = {stateOptions} 
                        value = {state} 
                        handleClose={handleClose}
                        modalOpen={modalOpen}
                        getApiStatus = {getApiStatus}
                        getValidateFields = {getValidateFields}/>
                </TaskContainer>
            );
        }
}

export {EachTask};