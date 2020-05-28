import React from 'react'
import { Route } from 'react-router-dom'

import { PROJECT_ROUTE } from '../constants/RouteConstants'

import { ProjectsRoute } from './ProjectsRoute'

const projectsRoute = <Route path={PROJECT_ROUTE} component={ProjectsRoute} />

export { projectsRoute }