import React, { Component } from 'react';
import { observer,inject } from 'mobx-react';
import {observable, reaction} from "mobx";
import { Dimmer, Loader } from 'semantic-ui-react';

import Colors from '../../themes/Colors';
import strings from '../../i18n/strings.json';


import {ProjectName,AddProjectContainer,WorkflowType,ProjectType,ProjectNameLabel,
    DescriptionLabel,WorkflowTypeLabel,ProjectTypeLabel,SubmitButton,DescriptionTextArea,
    Header
} from "./styleComponent";

@inject("newProjectStore")
@observer
class AddProject extends Component{
    @observable projectName = ""
    @observable projectDescription = ""
    @observable workFlowTypeId = null
    @observable projectType = null
    @observable projectDescription = ""
    errorMessage = {}
    
    componentDidMount(){
        const {workFlowType} = this.props.newProjectStore;
        workFlowType.apiCall({});
    }
    
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
        this.projectDescription = event.target.value; 
    }
    
    closeNewProjectPage = () =>{
        this.props.handleClose();
    }
    
    reaction1 = reaction(
        ()=>this.props.newProjectStore.newProject.getApiStatus,
        apiStatus=>{
            if(apiStatus===200){
               alert("Created project")
            }
        })
    
    
    submitDetailsOfProject = () =>{
        const {newProject} =this.props.newProjectStore;
        const {pojectName,workFlowTypeId,projectType,projectDescription} =this;
        if(pojectName===""){
            this.errorMessage.projectNameError = true
        }
        if(workFlowTypeId ===null){
            this.errorMessage.projectWorkFlowError=true;
        }
        if(projectType===null){
            this.errorMessage.projectWorkFlowError = true;
        }
        if(projectDescription === null){
            this.errorMessage.projectDescriptionError = true;
        }
        newProject.apiCall({pojectName,workFlowTypeId,projectType,projectDescription});
    }
    
    render(){
    
        const {workFlowType,newProject} = this.props.newProjectStore;
        const {addProject} = strings;
        const {onChangeProjectName,projectName,onChangeWorkflowType,onChangeProjectType,submitDetailsOfProject,
            projectDescription,onChangeDescription
        } =this;
        
        if(workFlowType.getApiStatus===100){
        return (
            <AddProjectContainer>
                <Dimmer active inverted>
                    <Loader size='medium'>Loading</Loader>
                </Dimmer>
            </AddProjectContainer>);
        }
        return(
            <AddProjectContainer>
            <Header>PROJECT</Header>
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
             <DescriptionTextArea value = {projectDescription} onChange = {onChangeDescription}/>
             <WorkflowTypeLabel
                  lableFor={addProject.WorkflowType}
                  content={addProject.WorkflowType}
               />
            <WorkflowType 
                options = {workFlowType.response} 
                onChange={onChangeWorkflowType} 
                placeholder = {strings.workflowTypePlaceHolder}
                styles = {{width:"400px",border:`1px solid ${Colors.lightBlueGrey}`,height:"40px"}}/>
            
            <ProjectTypeLabel
                  lableFor={addProject.ProjectType}
                  content={addProject.ProjectType}
               />
            <ProjectType 
                options = {addProject.projectTypes} 
                onChange = {onChangeProjectType} 
                placeholder = {strings.projectTypePlaceHolder}
                styles = {{width:"400px",border:`1px solid ${Colors.lightBlueGrey}`,height:"40px"}}/>
            <SubmitButton 
                    type = "button" 
                    content = {"Submit"}
                    apiStatus = {newProject.getApiStatus}
                    onClick = {submitDetailsOfProject}/>
            </AddProjectContainer>);
    }
}

export {AddProject};