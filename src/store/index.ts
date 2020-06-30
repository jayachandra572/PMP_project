import AuthenticationStore from '../Authentication/stores/AuthenticationStore'
import AuthAPIService from '../Authentication/services/AuthService/index.fixtures'
import UserDetailsStore from '../Authentication/stores/UserDetailsStore'

import ProjectsStore from '../ProjectsManagement/stores/ProjectsStore'
import ProjectsService from '../ProjectsManagement/services/ProjectsService/index.fixtures'

import PageNavigationStore from '../ProjectsManagement/stores/PageNavigationStore'

import NewProjectStore from '../ProjectsManagement/stores/NewProjectStore'
import NewProjectApiService from '../ProjectsManagement/services/NewProjectService/index.fixtures'

import TasksStore from '../ProjectsManagement/stores/TasksStore'
import TasksApiService from '../ProjectsManagement/services/TasksService/index.fixtures'

const authAPIService = new AuthAPIService()
const authenticationStore = new AuthenticationStore(authAPIService)

const userDetailsStore = new UserDetailsStore(authAPIService)

const tasksApiService = new TasksApiService()
const tasksStore = new TasksStore(tasksApiService, PageNavigationStore)

const newProjectApiService = new NewProjectApiService()
const newProjectStore = new NewProjectStore(newProjectApiService)

const projectsService = new ProjectsService()
const projectsStore = new ProjectsStore(projectsService, PageNavigationStore)
export default {
   authenticationStore,
   projectsStore,
   newProjectStore,
   tasksStore,
   userDetailsStore
}
