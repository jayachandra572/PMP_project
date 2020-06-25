import React, { Component } from 'react'

import AddTaskModal from '../AddTaskModal'
import strings from '../../i18n/strings.json'

import { TasksHeaderContainer, TasksTitle } from './styleComponent'
import { APIStatus } from "@ib/api-constants"

interface TasksHeaderProps {
   doNetWorkCall:()=>void
   apiStatus:APIStatus
}
function TasksHeader(props:TasksHeaderProps) {
   const {apiStatus,doNetWorkCall} = props
   return (
      <TasksHeaderContainer>
         <TasksTitle>{strings.tasks.title}</TasksTitle>
         <AddTaskModal apiStatus={apiStatus} doNetWorkCall = {doNetWorkCall} />
      </TasksHeaderContainer>
   )
}
export { TasksHeader }
