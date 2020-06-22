import React, { Component } from 'react'

import { getUserDetails } from '../../../Authentication/utils/LocalStrorageUtils'
import strings from '../../i18n/strings'
import { AddProjectModal } from '../AddProjectModal'

import { ProjectHeaderContainer, ProjectTitle } from './styleComponent'
class ProjectHeader extends Component {
   render() {
      const { userRole, doNetWorkCall, apiStatus, is_admin } = this.props
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
