import React ,{Component} from "react";

import {EachProject} from "../EachProject"
import {ProjectTopics} from "../ProjectTopics"
import ProjectHeader from "../ProjectHeader"
import {PageNavigation} from"../PageNavigation"

import LoadingWrapperWithFailure from "../../../Common/components/LoadingWrapperWithFailure";
import NoDataView from "../../../Common/components/NoDataView"
import {ProjectsContainer,ProjectsBox} from "./styleComponent"

class Projects extends Component {
    
    componentDidMount(){
        this.doNetWorkCall();
    }
    
    doNetWorkCall = () =>{
        this.props.getProjectsFromAPi();
    }
    
    renderProjects = ()=>{
        const {onClickProject,projects} =this.props
        return (projects.map((project,index)=>(<EachProject 
                    onClick = {onClickProject}
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
            projects,
            userRole
        } = this.props;
        return(
            <ProjectsContainer>
                <ProjectHeader />
                {projects.length===0?<NoDataView/>:
                <React.Fragment>
                    <ProjectsBox projectsPerPage = {projectsPerPage}>
                        <ProjectTopics/>
                            {this.renderProjects()}
                        </ProjectsBox>
                    {totalNumberOfPages!==1&&
                    <PageNavigation
                        activePageNumber = {activePageNumber}
                        totalNumberOfPages = {totalNumberOfPages}
                        navigateToNextPage = {navigateToNextPage}
                        navigateToPreviousPage = {navigateToPreviousPage}
                        onClickPageNumber={onClickPageNumber}/>}
                </React.Fragment>
                    
                }
                
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