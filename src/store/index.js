import AuthenticationStore from '../Authentication/stores/AuthenticationStore'
import UserDetailsStore from '../Authentication/stores/UserDetailsStore'
import AuthService from '../Authentication/services/AuthService/index.fixtures'

import ProjectsStore from '../ProjecstManagement/stores/ProjectsStore'
import ProjectsService from '../ProjecstManagement/services/ProjectsService/index.fixtures'

import PageNavigationStore from '../ProjecstManagement/stores/PageNavigationStore'

import NewProjectStore from '../ProjecstManagement/stores/NewProjectStore'
import NewProjectService from '../ProjecstManagement/services/NewProjectService/index.fixtures'

import TasksStore from '../ProjecstManagement/stores/TasksStore'
import TasksService from '../ProjecstManagement/services/TasksService/index.fixtures'

const authService = new AuthService()
const authenticationStore = new AuthenticationStore(authService)

const userDetailsStore = new UserDetailsStore(authService)

const tasksService = new TasksService()
const tasksStore = new TasksStore(tasksService, PageNavigationStore)

const newProjectService = new NewProjectService()
const newProjectStore = new NewProjectStore(newProjectService)

const projectsService = new ProjectsService()
const projectsStore = new ProjectsStore(projectsService, PageNavigationStore)
export default {
   authenticationStore,
   projectsStore,
   newProjectStore,
   tasksStore,
   userDetailsStore
}
