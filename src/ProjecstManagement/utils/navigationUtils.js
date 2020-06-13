import {PROJECT_ROUTE} from "../constants/RouteConstants"

export const goToProjectsPage = (history) =>{
    history.push(PROJECT_ROUTE)
}

export const goToSpecificProjectTasksScreen = (history,projectId) =>{
    history.push(`${PROJECT_ROUTE}/${projectId}/tasks`);
};