import React,{Component} from "react"

import {Header} from "../Header"
import {Projects} from "../Projects"
import { withRouter } from 'react-router-dom';

import {ProjectContainer} from "./styleComponent"
class  ProjectsView extends Component{
    onClickProject = ()=>{
        this.props.history.push(`/tasks`);
    }
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
            userData
        } =this.props;
        return(
            <ProjectContainer>
                <Header userLogOut = {userLogOut} userData = {userData}/>
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
                    onClickProject = {this.onClickProject}
                    />
            </ProjectContainer>)
    }
}



export default withRouter(ProjectsView)