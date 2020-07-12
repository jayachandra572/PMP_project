import React, { lazy } from 'react'
import { ProtectedRouter } from '../../Common/components/ProtectedRouter'
import { PROJECT_ROUTE, TASK_ROUTE } from '../constants/RouteConstants'
import ImagesRoute from './Images'

const ProjectsRoute = lazy(() => import('./ProjectsRoute'))
const TasksRoute = lazy(() => import('./TasksRoute'))
// const ImagesRoute = lazy(() => import('./Images'))

export const projectsRoute = (
   <ProtectedRouter exact path={PROJECT_ROUTE} component={ProjectsRoute} />
)

export const tasksRoute = (
   <ProtectedRouter exact path={TASK_ROUTE} component={TasksRoute} />
)

export const imagesRoute = (
   <ProtectedRouter path='/images' component={ImagesRoute} />
)
