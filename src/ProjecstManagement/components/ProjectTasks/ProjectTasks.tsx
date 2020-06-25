import React, { Component, Fragment } from 'react'
import { observer } from 'mobx-react'
import { APIStatus } from "@ib/api-constants"

import withPMPHeader from '../../hoc/withPmpHeader'
import { Tasks } from '../Tasks'
import strings from '../../i18n/strings.json'
import { BackButton } from './styledComponent'
import ProjectModel from "../../stores/models/ProjectModel"
import ApiCallModel from "../../stores/models/ApiCallModel"


interface ProjectTasksPropsType  {
   backToProjectsPage:()=> any
   taskValidationField:ApiCallModel
   projectTasks:any[]
   activePageNumber:number
   totalNumberOfPages:number
   navigateToNextPage:()=>void
   navigateToPreviousPage:() => void
   onClickPageNumber:(number:number)=> void
   apiStatus:APIStatus
   apiError:Error|null
   doNetWorkCall: () => void
   is_admin?:boolean
}



@observer
class ProjectTasks extends Component<ProjectTasksPropsType> {
   render() {
      const { backToProjectsPage } = this.props
      return (
         <Fragment>
            <BackButton onClick={backToProjectsPage}>
               {strings.backButtonText}
            </BackButton>
            <Tasks {...this.props} />
         </Fragment>
      )
   }
}

export default withPMPHeader(ProjectTasks)
