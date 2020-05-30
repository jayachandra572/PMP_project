import React, { Component } from 'react';
import { observer,inject } from 'mobx-react';
import {observable, reaction,action} from "mobx";
import { Dimmer, Loader } from 'semantic-ui-react';
import {RiCloseLine} from "react-icons/ri"

import Colors from '../../themes/Colors';
import strings from '../../i18n/strings.json';


import {ProjectName,AddProjectContainer,WorkflowType,ProjectType,ProjectNameLabel,
    DescriptionLabel,WorkflowTypeLabel,ProjectTypeLabel,SubmitButton,DescriptionTextArea,
    Header,Required,CloseButton
} from "./styleComponent";

@inject("newProjectStore")
@observer
class AddProject extends Component{
    @observable projectName 
    @observable workFlowTypeId = null
    @observable projectType = ""
    @observable projectDescription
    @observable errorMessage
    
    constructor(props){
        super(props)
        this.init();
    }
    componentDidMount(){
        const {workFlowType} = this.props.newProjectStore;
        workFlowType.apiCall({});
    }
    componentWillUnmount (){
        // this.reaction1.dispose();
    }
    
    @action.bound
    init() {
        this.projectName = ""
        this.projectDescription = ""
        this.errorMessage = {}
    }
    
    @action.bound
    onChangeProjectName (event){
        this.projectName = event.target.value;
        this.checkProjectNameError();
    }
    
    @action.bound
    onChangeWorkflowType (event,data){
        this.workFlowTypeId = data.value;
        this.checkWorkFlowTypeIdError();
    }
    
    @action.bound
    onChangeProjectType  (event,data) {
        this.projectType = data.value;
        this.checkProjectTypeError();
    }
    
    @action.bound
    onChangeDescription  (event){
        this.projectDescription = event.target.value; 
        this.checkProjectDescriptionError();
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
    checkProjectNameError=()=>{
        this.errorMessage.projectNameEmpty = this.projectName === "";
    }
    checkWorkFlowTypeIdError(){
        this.errorMessage.projectWorkFlowError=this.workFlowTypeId ===null; 
    }
    checkProjectTypeError= () =>{
         this.errorMessage.projectTypeError =this.projectType=== "";
    }
    
    checkProjectDescriptionError = () =>{
       this.errorMessage.projectDescriptionError = this.projectDescription === "";
    }
    
    anyErrorInPage =()=>{
        const {projectNameEmpty,projectWorkFlowError,projectTypeError,projectDescriptionError} = this.errorMessage
        return (projectNameEmpty || projectWorkFlowError || projectTypeError ||projectDescriptionError)
    }
    
    @action.bound
    submitDetailsOfProject(){
        const {newProject} =this.props.newProjectStore;
        const {pojectName,workFlowTypeId,projectType,projectDescription} =this;
        
        this.checkWorkFlowTypeIdError();
        this.checkProjectTypeError();
        this.checkProjectDescriptionError();
        this.checkProjectNameError();
        if(!this.anyErrorInPage()){
            newProject.apiCall({pojectName,workFlowTypeId,projectType,projectDescription});
            this.init();
        }
    }
    
    render(){
        
        const {workFlowType,newProject} = this.props.newProjectStore;
        const {addProject} = strings;
        const {onChangeProjectName,projectName,onChangeWorkflowType,onChangeProjectType,submitDetailsOfProject,
            projectDescription,onChangeDescription
        } =this;
        const {projectNameEmpty,projectWorkFlowError,projectTypeError,projectDescriptionError} = this.errorMessage
        
        if(workFlowType.getApiStatus===100){
            return (
                <AddProjectContainer>
                    <Dimmer active inverted>
                        <Loader size='medium'>{strings.loading}</Loader>
                    </Dimmer>
                </AddProjectContainer>);
        }
        return(
            <AddProjectContainer>
            <Header>PROJECT</Header>
            <CloseButton onClick ={this.props.handleClose}><RiCloseLine size = {24}/></CloseButton>
             <ProjectNameLabel
                isImportant = {true}
                lableFor={addProject.lableName}
                content={addProject.lableName}
               />
                <ProjectName
                    isEmpty = {projectNameEmpty}
                    id={addProject.lableName}
                    value={projectName}
                    onChange={onChangeProjectName}
                />
                {projectNameEmpty&&<Required>{strings.required}</Required>}
            <ProjectTypeLabel
                isImportant = {true}
                lableFor={addProject.ProjectType}
                content={addProject.ProjectType}/>
            <ProjectType
                data-testid = {strings.data_testid.projectTypeMenu}
                options = {addProject.projectTypes} 
                onChange = {onChangeProjectType} 
                placeholder = {`${addProject.projectTypePlaceHolder}`}
                styles = {{
                        color:Colors.steel,
                        width:"400px",
                        border:`1px solid ${projectTypeError?"red":Colors.lightBlueGrey}`,
                        height:"40px"}}/>
            {projectTypeError&&<Required>{strings.required}</Required>}
            
            <WorkflowTypeLabel
                isImportant = {true}
                lableFor={addProject.WorkflowType}
                content={addProject.WorkflowType}
               />
            <WorkflowType
                data-testid = {strings.data_testid.workFlowTypeMenu}
                options = {workFlowType.response}
                onChange={onChangeWorkflowType} 
                placeholder = {addProject.workflowTypePlaceHolder}
                styles = {{
                    color:Colors.steel,
                    width:"400px",
                    border:`1px solid ${projectWorkFlowError?"red":Colors.lightBlueGrey}`,
                    height:"40px"}}/>
            {projectWorkFlowError&&<Required>{strings.required}</Required>}
            
             <DescriptionLabel
                isImportant = {true}
                lableFor={addProject.lableDescription}
                content={addProject.lableDescription}
               />
             <DescriptionTextArea
                id = {addProject.lableDescription}
                isError = {projectDescriptionError}
                value = {projectDescription} 
                onChange = {onChangeDescription}/>
            {projectDescriptionError&&<Required>{strings.required}</Required>}
            <SubmitButton 
                    type = "button" 
                    content = {strings.submitButton}
                    apiStatus = {newProject.getApiStatus}
                    onClick = {submitDetailsOfProject}/>
            </AddProjectContainer>);
    }
}

export {AddProject};