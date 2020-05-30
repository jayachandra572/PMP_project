import React, { Component } from 'react';
import { observer,inject } from 'mobx-react';
import {observable, reaction,action} from "mobx";
import {RiCloseLine} from "react-icons/ri"

import Colors from '../../themes/Colors';
import strings from '../../i18n/strings.json';

import {AddTaskContainer,Header,TaskTitle,TaskTitleLabel,CloseButton,
    IssueTypeLabel, IssueTypeMenu,DescriptionLabel,DescriptionTextArea,SubmitButton,Required
} from "./styleComponent"

@inject('tasksStore')
@observer
class AddTask extends Component{
    @observable taskTitle 
    @observable issueType = null
    @observable description
    @observable errorMessage
    
    constructor(props){
        super(props)
        this.init();
    }
    
    @action.bound
    init(){
        this.taskTitle = "";
        this.description = "";
        this.errorMessage = {};
    }
    
    @action.bound
    onChangeTaskTitle (event){
        this.taskTitle = event.target.value;
        this.checkTaskTitle();
    }
    
    @action.bound
    onChangeIssueType (event,data){
        this.issueType = data.value;
        this.checkIssueType()
    }
    
    @action.bound
    onChangeDescription (event){
        this.description = event.target.value;
        this.checkDescription()
    }
    
    checkTaskTitle = ()=> {
        const {taskTitle} =this;
        this.errorMessage.taskTitleEmpty = taskTitle === "";
    }
    
    checkIssueType =  () =>{
        const {issueType} = this
        this.errorMessage.issueTypeError = issueType === null
    }
    
    checkDescription = () =>{
        const {description} =this
        this.errorMessage.descriptionError = description === ""
    }
    
    anyErrorInPage =()=>{
        const {descriptionError,issueTypeError,taskTitleEmpty} = this.errorMessage
        return (descriptionError || issueTypeError || taskTitleEmpty)
    }
    
    @action.bound
    submitTask  () {
        const {postTask} =this.props.tasksStore
        const {checkTaskTitle,checkDescription,checkIssueType,anyErrorInPage} = this;
        checkTaskTitle();
        checkIssueType();
        checkDescription();
        if(!anyErrorInPage()){
            const {taskTitle,issueType,description} = this;
            postTask.apiCall({taskTitle,issueType,description});
        }
    }
    
    reaction1 = reaction(
        ()=>this.props.tasksStore.postTask.getApiStatus,
        apiStatus=>{
            if(apiStatus===200){
                this.init();
            }
        })
    
    render(){
        const {tasks} = strings;
        const {postTask:{getApiStatus}} = this.props.tasksStore
        const {
            taskTitle,
            issueType,
            description,
            onChangeDescription,
            onChangeIssueType,
            onChangeTaskTitle
        } =this;
        const {descriptionError,issueTypeError,taskTitleEmpty} =this.errorMessage;
        return(
            <AddTaskContainer>
                 <Header>TASK</Header>
                 <CloseButton onClick ={this.props.handleClose}><RiCloseLine size = {24}/></CloseButton>
                 <TaskTitleLabel
                    isImportant = {true}
                    lableFor={tasks.taskTitleLable}
                    content={tasks.taskTitleLable}/>
                 <TaskTitle
                    isEmpty = {taskTitleEmpty}
                    id={tasks.taskTitleLable}
                    value={taskTitle}
                    onChange={onChangeTaskTitle}/>
                {taskTitleEmpty&&<Required>{strings.required}</Required>}
                <IssueTypeLabel
                    isImportant = {true}
                    lableFor={tasks.issueTypeLabel}
                    content={tasks.issueTypeLabel}/>
                <IssueTypeMenu
                    value = {issueType}
                    options = {tasks.issueTypes} 
                    onChange = {onChangeIssueType} 
                    placeholder = {tasks.issueTypePlaceHolder}
                    styles = {{
                        color:Colors.steel,
                        width:"400px",
                        border:`1px solid ${issueTypeError?Colors.red:Colors.lightBlueGrey}`,
                        height:"40px"}}/>
                {issueTypeError&&<Required>{strings.required}</Required>}
                <DescriptionLabel
                     isImportant = {true}
                    lableFor={tasks.descriptionLabel}
                    content={tasks.descriptionLabel}/>
                <DescriptionTextArea
                    id = {tasks.descriptionLabel}
                    isError = {descriptionError}
                    value = {description} 
                    onChange = {onChangeDescription}/>
                {descriptionError&&<Required>Required</Required>}
                <SubmitButton 
                    content = {strings.submitButton}
                    apiStatus = {getApiStatus}
                    onClick = {this.submitTask}/>
            </AddTaskContainer>
            )
    }
}

export {AddTask}