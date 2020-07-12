import React, { Component } from 'react'
import { observer } from 'mobx-react'
import LoadingWrapperWithFailure from '../../../Common/components/LoadingWrapperWithFailure'
import NoDataView from '../../../Common/components/NoDataView'
import withPMPHeader from '../../hoc/withPmpHeader'
import { EachProject } from '../EachProject'
import { ProjectTopics } from '../ProjectTopics'
import ProjectHeader from '../ProjectHeader'
import { PageNavigation } from '../PageNavigation'

import { ProjectsContainer, ProjectsBox } from './styleComponent'
import { APIStatus } from '@ib/api-constants'
import ProjectModel from '../../stores/models/ProjectModel'

interface ProjectsPropsType {
   projectsPerPage: number
   projects: ProjectModel[]
   activePageNumber: number
   totalNumberOfPages: number
   navigateToNextPage: () => void
   navigateToPreviousPage: () => void
   onClickPageNumber: (number: number) => void
   apiStatus: APIStatus
   apiError: Error | null
   doNetWorkCall: () => void
   onClickProject: (id: string) => void
   is_admin?: boolean
}

interface WrappedComponentProps extends ProjectsPropsType {
   is_admin: boolean
}

@observer
class Projects extends Component<ProjectsPropsType> {
   getWrappedComponentProps = () => this.props as WrappedComponentProps
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
      const { projects } = this.props
      if (projects.length === 0) {
         return <NoDataView />
      } else {
         return (
            <ProjectsBox>
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
      } = this.getWrappedComponentProps()
      return (
         <ProjectsContainer>
            <ProjectHeader
               is_admin={is_admin}
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
export default withPMPHeader(Projects)
