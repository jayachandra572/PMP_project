import React from 'react'
import { Route } from 'react-router-dom'

import {ProtectedRouter} from "../../Common/utils/ProtectedRouter"
import { PROJECT_ROUTE } from '../constants/RouteConstants'
import { ProjectsRoute } from './ProjectsRoute'

const projectsRoute = <ProtectedRouter path={PROJECT_ROUTE} component={ProjectsRoute} />

export { projectsRoute }