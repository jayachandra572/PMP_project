import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Header } from '../Header'
import { Tasks } from '../Tasks'
import strings from '../../i18n/strings.json'
import { TasksContainer, BackButton } from './styledComponent'

@observer
class ProjectTasks extends Component {
   render() {
      const { userLogOut, backToProjectsPage } = this.props
      return (
         <TasksContainer>
            <BackButton onClick={backToProjectsPage}>
               {strings.backButtonText}
            </BackButton>
            <Header userLogOut={userLogOut} />
            <Tasks {...this.props} />)
         </TasksContainer>
      )
   }
}

export default ProjectTasks
