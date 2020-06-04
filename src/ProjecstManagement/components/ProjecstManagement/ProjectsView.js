import React,{Component} from "react"

import {Header} from "../Header"
import {Projects} from "../Projects"
import LoadingWrapperWithFailure from "../../../Common/components/LoadingWrapperWithFailure";
import WithModal from "../../hoc/withModal"

import {ProjectContainer} from "./styleComponent";
class  ProjectsView extends Component{
    renderSuccessUI = () =>{
         const {
            projects,
            activePageNumber , 
            totalNumberOfPages , 
            navigateToNextPage ,
            navigateToPreviousPage,
            onClickPageNumber,
            projectsPerPage,
            onClickProject
        } =this.props;
        return(<Projects 
            projects = {projects}
            activePageNumber = {activePageNumber}
            totalNumberOfPages = {totalNumberOfPages}
            navigateToNextPage = {navigateToNextPage}
            navigateToPreviousPage = {navigateToPreviousPage}
            onClickPageNumber = {onClickPageNumber}
            projectsPerPage = {projectsPerPage}
            onClickProject = {onClickProject}/>)
    }
    
    render(){
        const {
            userLogOut,
            getProjectsApiError,
            getProjectsApiStatus,
            userData,
        doNetWorkCall
        } =this.props;
        return(
            <ProjectContainer>
                <Header userLogOut = {userLogOut} userData = {userData}/>
                <LoadingWrapperWithFailure
                apiError = {getProjectsApiError}
                apiStatus = {getProjectsApiStatus}
                onRetryClick = {doNetWorkCall}
                renderSuccessUI = {this.renderSuccessUI}/>
            </ProjectContainer>);
    }
}



export default ProjectsView