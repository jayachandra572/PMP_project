import React, { lazy } from 'react'
import { ProtectedRouter } from '../../Common/components/ProtectedRouter'
import { PROJECT_ROUTE, TASK_ROUTE } from '../constants/RouteConstants'

const ProjectsRoute = lazy(() => import('./ProjectsRoute'))
const TasksRoute = lazy(() => import('./TasksRoute'))

export const projectsRoute = (
   <ProtectedRouter exact path={PROJECT_ROUTE} component={ProjectsRoute} />
)

export const tasksRoute = (
   <ProtectedRouter exact path={TASK_ROUTE} component={TasksRoute} />
)
