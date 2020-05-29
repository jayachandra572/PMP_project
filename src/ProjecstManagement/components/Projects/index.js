import React ,{Component} from "react";

import {EachProject} from "../EachProject"
import {ProjectTopics} from "../ProjectTopics"
import {ProjectHeader} from "../ProjectHeader"
import {PageNavigation} from"../PageNavigation"

import {ProjectsContainer,ProjectsBox} from "./styleComponent"
import LoadingWrapperWithFailure from "../../../Common/components/LoadingWrapperWithFailure";

class Projects extends Component {
    
    componentDidMount(){
        this.doNetWorkCall();
    }
    
    doNetWorkCall = () =>{
        this.props.getProjectsFromAPi();
    }
    
    renderProjects = ()=>{
        const projects = this.props.projects;
        return (projects.map((project,index)=>(<EachProject 
                    key= {project.id} 
                    project = {project} 
                    index = {index}/>)));
    }
    
    renderSuccessUI = () =>{
         const {
            activePageNumber , 
            totalNumberOfPages , 
            navigateToNextPage ,
            navigateToPreviousPage,
            onClickPageNumber,
            projectsPerPage,
            modalOpen
        } = this.props;
        return(
            <ProjectsContainer>
                <ProjectHeader />
                <ProjectsBox projectsPerPage = {projectsPerPage}>
                    <ProjectTopics/>
                        {this.renderProjects()}
                    </ProjectsBox>
                <PageNavigation
                        activePageNumber = {activePageNumber}
                        totalNumberOfPages = {totalNumberOfPages}
                        navigateToNextPage = {navigateToNextPage}
                        navigateToPreviousPage = {navigateToPreviousPage}
                        onClickPageNumber={onClickPageNumber}/>
                
            </ProjectsContainer>)
    }
    
    render(){
       const {getProjectsApiError,getProjectsApiStatus} = this.props;
        return (
            <LoadingWrapperWithFailure
                apiError = {getProjectsApiError}
                apiStatus = {getProjectsApiStatus}
                onRetryClick = {this.doNetWorkCall}
                renderSuccessUI = {this.renderSuccessUI}/>
            );
    }
}

export {Projects};