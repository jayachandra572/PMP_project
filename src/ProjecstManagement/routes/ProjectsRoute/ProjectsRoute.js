import React,{Component} from "react"
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom';

import ProjectsView from "../../components/ProjecstManagement";

@inject('authenticationStore','projectsStore')
@observer
class ProjectsRoute extends Component{
    
    componentDidMount(){
       this.doNetWorkCall();
    }
    
    onClickProject = (projectId)=>{
        this.props.history.push(`/projects/${projectId}/tasks`);
    }
    doNetWorkCall = () =>{
         const {getProjectsFromAPi} = this.props.projectsStore;
        getProjectsFromAPi();
    }
    
    render(){
        const {
            projects,
            activePageNumber,
            totalNumberOfPages,
            navigateToPreviousPage,
            navigateToNextPage,
            projectsPerPage,
            onClickPageNumber,
            getProjectsApiStatus,
            getProjectsApiError,
            getProjectsFromAPi,
        } = this.props.projectsStore;
        const {userLogOut} = this.props.authenticationStore;
        return(<ProjectsView 
                    projectsPerPage = {projectsPerPage}
                    userLogOut= {userLogOut} 
                    projects = {projects}
                    activePageNumber = {activePageNumber}
                    totalNumberOfPages = {totalNumberOfPages}
                    navigateToNextPage = {navigateToNextPage}
                    navigateToPreviousPage = {navigateToPreviousPage}
                    onClickPageNumber = {onClickPageNumber}
                    getProjectsApiError = {getProjectsApiError}
                    getProjectsApiStatus = {getProjectsApiStatus}
                    getProjectsFromAPi = {getProjectsFromAPi}
                    doNetWorkCall = {this.doNetWorkCall}
                    userData = {{}}
                    onClickProject = {this.onClickProject}
                    />
            );
    }
} 

export  default withRouter(ProjectsRoute)
