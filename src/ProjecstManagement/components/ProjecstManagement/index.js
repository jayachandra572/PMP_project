import React,{Component} from "react"

import {Header} from "../Header"
import {Projects} from "../Projects"
import {AddProject} from "../AddProject"
import Modal from "../AddProject/Modal"

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
            isModalOpen,
            modalClose,
            modalOpen
        } =this.props;
        console.log(modalOpen,modalClose,isModalOpen)
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
                    modalOpen = {modalOpen}
                    />
                <button onClick = {userLogOut}>logout</button>;
                <Modal open = {isModalOpen} close = {modalClose}/>
            </ProjectContainer>)
    }
}



export default ProjectsView