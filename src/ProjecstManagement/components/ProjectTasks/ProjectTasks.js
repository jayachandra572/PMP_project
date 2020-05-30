import React ,{Component}from "react"
import {Header} from "../Header"
import {Tasks} from "../Tasks"
import {TasksContainer} from "./styledComponent"

class ProjectTasks extends Component{
    render(){
        const {apiStatus,apiError,doNetWorkCall,projectTasks,userLogOut} = this.props;
        return ( <TasksContainer>
                <Header userLogOut = {userLogOut}/>
                <Tasks 
                    tasks = {projectTasks}
                    projectsPerPage = {"5"}
                    apiStatus = {apiStatus}
                    apiError = {apiError}
                    doNetWorkCall = {doNetWorkCall}
                    />
    </TasksContainer>)
    }
}

export default ProjectTasks;