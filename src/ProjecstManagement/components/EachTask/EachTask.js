import React , {Component} from "react"
import {toJS} from "mobx"
import {CreatedBy} from "../CreatedBy"
import {observer} from "mobx-react";
import {reaction} from "mobx";

import {TaskStateMenu} from "./TaskStateMenu";
import TaskInfoCard from "./TaskInfoCard"
import {IssueType,Title,Description,CreatedAt,TaskContainer} from "./styleComponent";

@observer
class EachTask extends Component{
    
    onChangeState =(toStatus)=>{
        this.getValidateFields(toStatus);
        this.props.task.toStatus = toStatus;
    }
    
    getValidateFields = (toStatus) =>{
        const {taskValidationField,task:{state}} = this.props;
        taskValidationField.apiCall({fromStatus:state,toStatus:toStatus});
    }
    
    onClickStateMenu = (event,data)=>{
        const {task:{getStatusTransitionOptions}} = this.props;
        getStatusTransitionOptions();
    }
    
    render(){
        const {index,taskValidationField} = this.props;
        const {issueType,title,createdBy,createdAt,
        state,stateOptions,getApiStatus,description,taskTrasitionState,getApiError} = this.props.task;
        const {getValidateFields,onChangeState,handleClose,modalOpen,onClickStateMenu} =this;
        const isOdd = index%2 ===1;
        return(
                <TaskContainer isOdd = {isOdd} >
                    <Title>{title}</Title>
                    <IssueType>{issueType}</IssueType>
                    <CreatedBy name = {createdBy} />
                    <Description>{description}</Description>
                    <CreatedAt>{createdAt}</CreatedAt>
                    <TaskStateMenu 
                        taskValidationField = {taskValidationField}
                        onChangeState = {onChangeState} 
                        onClickStateMenu = {onClickStateMenu}
                        options = {stateOptions} 
                        handleClose={handleClose}
                        modalOpen={modalOpen}
                        getApiStatus = {getApiStatus}
                        getApiError = {getApiError}
                        getValidateFields = {getValidateFields}
                        title = {title}
                        fromStatus = {state} 
                        taskTrasitionState = {taskTrasitionState}/>
                    <TaskInfoCard
                         taskDetails = {this.props.task}/>
                </TaskContainer>);
        }
}

export {EachTask};