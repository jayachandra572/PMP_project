import React, { Component } from 'react'

import { Header } from '../Header'
import { Projects } from '../Projects'

import { ProjectContainer } from './styleComponent'
class ProjectsView extends Component {
   render() {
      const { userLogOut, userData } = this.props
      return (
         <ProjectContainer>
            <Header userLogOut={userLogOut} userData={userData} />
            <Projects {...this.props} />
         </ProjectContainer>
      )
   }
}

export default ProjectsView
