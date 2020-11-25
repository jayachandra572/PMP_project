import React from 'react'
import { Route } from 'react-router-dom'

import { ProtectedRouter } from '../../Common/components/ProtectedRouter'
import {
   PROJECT_ROUTE,
   TASK_ROUTE,
   CREATE_WORK_FLOW_ROUTE,
   videosPageOne,
   videosPageFour,
   videosPageThree,videosPageTwo
} from '../constants/RouteConstants'
import { ProjectsRoute } from './ProjectsRoute'
import { TasksRoute } from './TasksRoute'

import { CreateWorkFlowRoute } from './CreateWorkFlowRoute'
import VideosPageOne from "./VideosPageOne"
import VideosPageTwo from "./VideosPageTwo"
import VideosPageFour from "./VideosPageFour"
import VideosPageThree from "./VideosPageThree"

export const projectsRoute = (
   <ProtectedRouter exact path={PROJECT_ROUTE} component={ProjectsRoute} />
)

export const tasksRoute = (
   <ProtectedRouter exact path={TASK_ROUTE} component={TasksRoute} />
)

export const createWorkFlowRoute = (
   <Route exact path={CREATE_WORK_FLOW_ROUTE} component={CreateWorkFlowRoute} />
)

export const VideoPageOneRoute = <ProtectedRouter exact path ={videosPageOne} component = {VideosPageOne}/>
export const videosPageTwoRoute = <ProtectedRouter exact path ={videosPageTwo} component = {VideosPageTwo}/>
export const videosPageThreeRoute = <ProtectedRouter exact path ={videosPageThree} component = {VideosPageThree}/>
export const videosPageFourRoute = <ProtectedRouter exact path ={videosPageFour} component = {VideosPageFour}/>


