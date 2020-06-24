import {History} from "history"
import { PROJECT_ROUTE } from '../constants/RouteConstants'

export const goToProjectsPage = (history:History) => {
   history.push(PROJECT_ROUTE)
}

export const goToSpecificProjectTasksScreen = (history:History, projectId:string) => {
   history.push(`${PROJECT_ROUTE}/${projectId}/tasks`)
}
