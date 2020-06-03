import React ,{Component}from "react"

import LoadingWrapperWithFailure from "../../../Common/components/LoadingWrapperWithFailure";
import {Header} from "../Header"
import {Tasks} from "../Tasks"
import {TasksContainer} from "./styledComponent"

class ProjectTasks extends Component{
    renderSuccessUI = () =>{
        const {apiStatus,apiError,projectTasks,taskValidationField} = this.props;
        return(<Tasks 
                    tasks = {projectTasks}
                    taskValidationField = {taskValidationField}
                    projectsPerPage = {"5"}
                    apiStatus = {apiStatus}
                    apiError = {apiError}
                    />)}
    
    
    render(){
        const {apiStatus,apiError,doNetWorkCall,userLogOut} = this.props;
        return ( <TasksContainer>
                <Header userLogOut = {userLogOut}/>
                 <LoadingWrapperWithFailure
                    apiError = {apiError}
                    apiStatus = {apiStatus}
                    onRetryClick = {doNetWorkCall}
                    renderSuccessUI = {this.renderSuccessUI}/>
    </TasksContainer>)
    }
}

export default ProjectTasks;