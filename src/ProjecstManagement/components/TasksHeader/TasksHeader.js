import React, { Component } from 'react'

import AddTaskModal from '../AddTaskModal'
import strings from '../../i18n/strings'

import { TasksHeaderContainer, TasksTitle } from './styleComponent'
function TasksHeader(props) {
   return (
      <TasksHeaderContainer>
         <TasksTitle>{strings.tasks.title}</TasksTitle>
         <AddTaskModal apiStatus={props.apiStatus} />
      </TasksHeaderContainer>
   )
}
export { TasksHeader }
