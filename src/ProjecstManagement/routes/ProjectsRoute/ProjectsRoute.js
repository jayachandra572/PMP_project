import React,{Component} from "react"
import { inject, observer } from 'mobx-react'
import {reaction} from "react";


import Projects from "../../components/ProjecstManagement";

@inject('authenticationStore','projectsStore')
@observer

class ProjectsRoute extends Component{
    
    componentDidMount(){
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
            getProjectsFromAPi
        } = this.props.projectsStore;
        const {userLogOut} = this.props.authenticationStore;
        return(<Projects 
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
                    />
            );
    }
} 

export {ProjectsRoute};
