import React, { Component } from 'react'

import strings from '../../i18n/strings.json'
import { AddProjectModal } from '../AddProjectModal'

import { ProjectHeaderContainer, ProjectTitle } from './styleComponent'
import { APIStatus } from "@ib/api-constants"

interface ProjectHeaderProps {
    doNetWorkCall:()=>void
    apiStatus:APIStatus
    is_admin:boolean
}
class ProjectHeader extends Component<ProjectHeaderProps> {
   render() {
      const {  doNetWorkCall, apiStatus, is_admin } = this.props
      return (
         <ProjectHeaderContainer>
            <ProjectTitle>{strings.ProjectTitle}</ProjectTitle>
            {is_admin && (
               <AddProjectModal
                  apiStatus={apiStatus}
                  doNetWorkCall={doNetWorkCall}
               />
            )}
         </ProjectHeaderContainer>
      )
   }
}
export default ProjectHeader
