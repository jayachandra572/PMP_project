import React, { Component } from 'react'
import { observer } from 'mobx-react'
import {observable} from "mobx"

import strings from '../../i18n/strings.json'

import TextArea from "../../../Common/components/TextArea";

import {ProjectName,AddProjectContainer,WorkflowType,ProjectType,ProjectNameLabel,
    DescriptionLabel,WorkflowTypeLabel,ProjectTypeLabel,SubmitButton
} from "./styleComponent"

@observer
class AddProject extends Component{
     @observable projectName = ""
     @observable projectDescription = ""
     @observable workFlowTypeId = null
   @observable projectType = null
    @observable description = ""
    errorMessage = {}
    
    onChangeProjectName = (event) =>{
        this.projectName = event.target.value;
    }
    
    onChangeWorkflowType = (event,data)=>{
        this.workFlowTypeId = data.value;
    }
    
    onChangeProjectType = (event,data) =>{
        this.projectType = data.value;
    }
    
    onChangeDescription = (event)=>{
        this.description = event.target.value; 
    }
    
    submitDetailsOfProject = () =>{
        if(this.pojectName===""){
            this.errorMessage.projectNameError = "Enter Project Name";
        }
        if(this.workFlowTypeId ===null){
            this.errorMessage.projectWorkFlowError= "Selece one of the Work flow";
        }
        if(this.projectType===null){
            this.errorMessage.projectWorkFlowError = "Selece one of the Work flow";
        }
        this.props.close();
    }
    
    render(){
        const {addProject} = strings;
        const {onChangeProjectName,projectName,onChangeWorkflowType,onChangeProjectType,submitDetailsOfProject,
            description,onChangeDescription
        } =this;
        const options = [{
            key:"1",
            text:"1",
            value:"1",
        },
        {
            key:"2",
            text:"2",
            value:"2",
        },
        {
            key:"3",
            text:"3",
            value:"3",
        }]
        return(
            <AddProjectContainer>
             <ProjectNameLabel
                  lableFor={addProject.lableName}
                  content={addProject.lableName}
               />
            <ProjectName
                  id={addProject.lableName}
                  value={projectName}
                  onChange={onChangeProjectName}
            />
            <DescriptionLabel
                  lableFor={addProject.lableDescription}
                  content={addProject.lableDescription}
               />
               <TextArea value = {description} onChange = {onChangeDescription}/>
             <WorkflowTypeLabel
                  lableFor={addProject.WorkflowType}
                  content={addProject.WorkflowType}
               />
            <WorkflowType options = {options} onChange={onChangeWorkflowType} placeholder = "Select work flow type"/>
            
            <ProjectTypeLabel
                  lableFor={addProject.WorkflowType}
                  content={addProject.WorkflowType}
               />
            <ProjectType options = {addProject.projectTypes} onChange = {onChangeProjectType} placeholder = "Select Project typeonChange"/>
            <SubmitButton type = "button" content = {"Sumbit"} onClick = {submitDetailsOfProject}/>
            </AddProjectContainer>);
    }
}

export {AddProject};