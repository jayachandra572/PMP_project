import React , {Component} from "react"
import { API_SUCCESS } from '@ib/api-constants'
import {CreatedBy} from "../CreatedBy"
import {observer} from "mobx-react";
import {reaction} from "mobx";

import {TaskStateMenu} from "./TaskStateMenu";
import TaskInfoCard from "./TaskInfoCard"
import {IssueType,Title,Description,CreatedAt,TaskContainer} from "./styleComponent";

@observer
class EachTask extends Component{
    
    componentWillUnmount(){
        this.taskTrasitionStateReaction();
    }
    onChangeState =(toStatus)=>{
        this.getValidateFields(toStatus);
        this.props.task.toStatus = toStatus;
    }
    
    getValidateFields = (toStatus) =>{
        const {taskValidationField,task:{state,id}} = this.props;
        taskValidationField.apiCall({fromStatus:state,toStatus:toStatus,id:id});
    }
    
    onClickStateMenu = (event,data)=>{
        const {task:{getStatusTransitionOptions}} = this.props;
        getStatusTransitionOptions();
    }
    
    taskTrasitionStateReaction = reaction(
        ()=>this.props.task.taskTrasitionState.getApiStatus,
        apiStatus=>{
            if(apiStatus === API_SUCCESS){
                alert(1)
                this.props.doNetWorkCall();
            }
        })
    
    render(){
        const {index,taskValidationField} = this.props;
        const {issueType,title,createdBy,createdAt,
        state,stateOptions,getApiStatus,description,taskTrasitionState,getApiError,id} = this.props.task;
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
                        taskId = {id}
                        taskTrasitionState = {taskTrasitionState}/>
                    <TaskInfoCard
                         taskDetails = {this.props.task}/>
                </TaskContainer>);
        }
}

export {EachTask};