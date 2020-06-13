import React from 'react'
import { Route } from 'react-router-dom'

import { ProtectedRouter } from '../../Common/utils/ProtectedRouter'
import {
   PROJECT_ROUTE,
   TASK_ROUTE,
   CREATE_WORK_FLOW_ROUTE
} from '../constants/RouteConstants'
import { ProjectsRoute } from './ProjectsRoute'
import { TasksRoute } from './TasksRoute'

import { CreateWorkFlowRoute } from './CreateWorkFlowRoute'

export const projectsRoute = (
   <ProtectedRouter exact path={PROJECT_ROUTE} component={ProjectsRoute} />
)

export const tasksRoute = (
   <ProtectedRouter exact path={TASK_ROUTE} component={TasksRoute} />
)

export const createWorkFlowRoute = (
   <Route eaxct path={CREATE_WORK_FLOW_ROUTE} component={CreateWorkFlowRoute} />
)
