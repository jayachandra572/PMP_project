import React, { Component } from 'react'
import LoadingWrapperWithFailure from '../../../Common/components/LoadingWrapperWithFailure'

import WithPMPHeader from '../../hoc/withPmpHeader'
import { EachProject } from '../EachProject'
import { ProjectTopics } from '../ProjectTopics'
import ProjectHeader from '../ProjectHeader'
import { PageNavigation } from '../PageNavigation'
import NoDataView from '../../../Common/components/NoDataView'
import { ProjectsContainer, ProjectsBox } from './styleComponent'

class Projects extends Component {
   renderProjects = () => {
      const { onClickProject, projects } = this.props
      return projects.map((project, index) => (
         <EachProject
            onClick={onClickProject}
            key={project.id}
            project={project}
            index={index}
         />
      ))
   }
   renderSuccessUI = () => {
      const { projectsPerPage, projects } = this.props
      if (projects.length === 0) {
         return <NoDataView />
      } else {
         return (
            <ProjectsBox projectsPerPage={projectsPerPage}>
               <ProjectTopics />
               {this.renderProjects()}
            </ProjectsBox>
         )
      }
   }

   render() {
      const {
         doNetWorkCall,
         getProjectsApiError,
         getProjectsApiStatus,
         activePageNumber,
         totalNumberOfPages,
         navigateToNextPage,
         navigateToPreviousPage,
         onClickPageNumber
      } = this.props
      return (
         <ProjectsContainer>
            <ProjectHeader
               doNetWorkCall={doNetWorkCall}
               apiStatus={getProjectsApiStatus}
            />
            <LoadingWrapperWithFailure
               apiError={getProjectsApiError}
               apiStatus={getProjectsApiStatus}
               onRetryClick={doNetWorkCall}
               renderSuccessUI={this.renderSuccessUI}
            />
            <PageNavigation
               apiStatus={getProjectsApiStatus}
               activePageNumber={activePageNumber}
               totalNumberOfPages={totalNumberOfPages}
               navigateToNextPage={navigateToNextPage}
               navigateToPreviousPage={navigateToPreviousPage}
               onClickPageNumber={onClickPageNumber}
            />
         </ProjectsContainer>
      )
   }
}
export default Projects
