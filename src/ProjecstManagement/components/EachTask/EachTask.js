import React , {Component} from "react"

import {CreatedBy} from "../CreatedBy"
import {observable} from "mobx"
import {observer} from "mobx-react"

import {TaskStateMenu} from "./TaskStateMenu";
import TaskInfoCard from "./TaskInfoCard"
import {IssueType,Title,Description,CreatedAt,TaskContainer,TaskInfo} from "./styleComponent";

@observer
class EachTask extends Component{
    @observable modalOpen = false
    
    onChangeState =(event,data)=>{
        this.props.task.toStatus = data.value;
        this.getValidateFields();
        this.handleOpen();
    }
    
    getValidateFields = () =>{
        const {taskValidationField,task:{state,toStatus}} = this.props;
        taskValidationField.apiCall({fromStatus:state,toStatus:toStatus});
    }
    
    onClickStateMenu = (event,data)=>{
        const {task:{getStatusTransitionOptions}} = this.props;
        getStatusTransitionOptions();
    }
    
    handleOpen = () => this.modalOpen= true 
    handleClose = () => this.modalOpen = false
    
    render(){
        const {index,taskValidationField} = this.props;
        const {issueType,title,createdBy,createdAt,
        state,stateOptions,getApiStatus,description,toStatus} = this.props.task;
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
                        value = {state} 
                        handleClose={handleClose}
                        modalOpen={modalOpen}
                        getApiStatus = {getApiStatus}
                        getValidateFields = {getValidateFields}
                        title = {title}
                        toStatus = {toStatus}/>
                    <TaskInfoCard
                         taskDetails = {this.props.task}/>
                </TaskContainer>);
        }
}

export {EachTask};