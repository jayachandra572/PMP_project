import React, { Component } from 'react'
import {observer} from "mobx-react"
import LoadingWrapperWithFailure from '../../../Common/components/LoadingWrapperWithFailure'
import NoDataView from '../../../Common/components/NoDataView'
import withPMPHeader from '../../hoc/withPmpHeader'
import { EachProject } from '../EachProject'
import { ProjectTopics } from '../ProjectTopics'
import ProjectHeader from '../ProjectHeader'
import { PageNavigation } from '../PageNavigation'

import { ProjectsContainer, ProjectsBox } from './styleComponent'

@observer
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
   renderSuccessUI = observer(() => {
      const { projectsPerPage, projects } = this.props
      if ( projects.length === 0) {
         return <NoDataView />
      } else {
         return (
            <ProjectsBox projectsPerPage={projectsPerPage}>
               <ProjectTopics />
               {this.renderProjects()}
            </ProjectsBox>
         )
      }
   })

   render() {
      const {
         doNetWorkCall,
         apiStatus,
         apiError,
         activePageNumber,
         totalNumberOfPages,
         navigateToNextPage,
         navigateToPreviousPage,
         onClickPageNumber,
         is_admin
      } = this.props;
      return (
         <ProjectsContainer>
            <ProjectHeader
               is_admin = {is_admin}
               doNetWorkCall={doNetWorkCall}
               apiStatus={apiStatus}
            />
            <LoadingWrapperWithFailure
               apiError={apiError}
               apiStatus={apiStatus}
               onRetryClick={doNetWorkCall}
               renderSuccessUI={this.renderSuccessUI}
            />
            <PageNavigation
               apiStatus={apiStatus}
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
export default withPMPHeader(Projects);
