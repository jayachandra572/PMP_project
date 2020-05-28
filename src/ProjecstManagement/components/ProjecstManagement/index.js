import React,{Component} from "react"

import {Header} from "../Header"
import {Projects} from "../Projects"

import {ProjectView} from "./styleComponent"
function ProjectsView(props){
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
        getProjectsFromAPi
    } =props;
    return(
        <ProjectView>
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
            <button onClick = {userLogOut}>logout</button>;
        </ProjectView>)
}

export default ProjectsView