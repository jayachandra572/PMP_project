import React from 'react'
import { Route } from 'react-router-dom'

import {ProtectedRouter} from "../../Common/utils/ProtectedRouter"
import { PROJECT_ROUTE,TASK_ROUTE } from '../constants/RouteConstants'
import { ProjectsRoute } from './ProjectsRoute'
import {TasksRoute} from "./TasksRoute"

export const projectsRoute = <ProtectedRouter path={PROJECT_ROUTE} component={ProjectsRoute} />

export const tasksRoute = <ProtectedRouter path={TASK_ROUTE} component = {TasksRoute}/>
