import React, { Component,Fragment } from 'react'
import { observer } from 'mobx-react'
import withPMPHeader from '../../hoc/withPmpHeader'
import { Tasks } from '../Tasks'
import strings from '../../i18n/strings.json'
import {  BackButton } from './styledComponent'

@observer
class ProjectTasks extends Component {
   render() {
      const { backToProjectsPage } = this.props;
      return (
         <Fragment>
            <BackButton onClick={backToProjectsPage}>
               {strings.backButtonText}
            </BackButton>
            <Tasks {...this.props} />
            </Fragment>);
   }
}

export default withPMPHeader(ProjectTasks);
