import React, { Component } from 'react'

import AddTaskModal from '../AddTaskModal'
import strings from '../../i18n/strings'

import { TasksHeaderContainer, TasksTitle } from './styleComponent'
function TasksHeader(props) {
   const {apiStatus,doNetworkCall}
   return (
      <TasksHeaderContainer>
         <TasksTitle>{strings.tasks.title}</TasksTitle>
         <AddTaskModal apiStatus={apiStatus} doNetWorkCall = {doNetworkCall} />
      </TasksHeaderContainer>
   )
}
export { TasksHeader }
