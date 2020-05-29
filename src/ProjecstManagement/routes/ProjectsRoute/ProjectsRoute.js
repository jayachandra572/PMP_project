import React,{Component} from "react"
import { inject, observer } from 'mobx-react'


import ProjectsView from "../../components/ProjecstManagement";

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
            getProjectsFromAPi,
            modalClose,
            modalOpen,
            isCreateProjectFormOpen
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
                    modalClose = {modalClose}
                    modalOpen = {modalOpen}
                    isCreateProjectFormOpen = {isCreateProjectFormOpen}
                    />
            );
    }
} 

export {ProjectsRoute};
