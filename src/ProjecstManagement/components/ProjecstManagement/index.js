import React,{Component} from "react"

import {Header} from "../Header"
import {Projects} from "../Projects"
import {AddProjectModal} from "../AddProjectModal"

import {ProjectContainer} from "./styleComponent"
class  ProjectsView extends Component{
    
    render(){
        const {
            userLogOut,
            projects,
            activePageNumber , 
            totalNumberOfPages , 
            navigateToNextPage ,
            navigateToPreviousPage,
            onClickPageNumber,
            projectsPerPage,
            getProjectsApiError,
            getProjectsApiStatus,
            getProjectsFromAPi,
        } =this.props;
        return(
            <ProjectContainer>
                <Header/>
                <Projects 
                    projects = {projects}
                    activePageNumber = {activePageNumber}
                    totalNumberOfPages = {totalNumberOfPages}
                    navigateToNextPage = {navigateToNextPage}
                    navigateToPreviousPage = {navigateToPreviousPage}
                    onClickPageNumber = {onClickPageNumber}
                    projectsPerPage = {projectsPerPage}
                    getProjectsApiError = {getProjectsApiError}
                    getProjectsApiStatus = {getProjectsApiStatus}
                    getProjectsFromAPi = {getProjectsFromAPi}
                    />
                <button onClick = {userLogOut}>logout</button>
        
            </ProjectContainer>)
    }
}



export default ProjectsView