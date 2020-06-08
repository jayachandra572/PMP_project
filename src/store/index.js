import AuthenticationStore from '../Authentication/stores/AuthenticationStore'
import AuthService from '../Authentication/services/AuthService/index.api';
import UserDetailsStore from "../Authentication/stores/UserDetailsStore"

import ProjectsStore from '../ProjecstManagement/stores/ProjectsStore';
import ProjectsService from '../ProjecstManagement/services/ProjectsService/index.api';

import NewProjectStore from '../ProjecstManagement/stores/NewProjectStore';
import NewProjectService from '../ProjecstManagement/services/NewProjectService/index.api';

import TasksStore from '../ProjecstManagement/stores/TasksStore';
import TasksService from '../ProjecstManagement/services/TasksService/index.api';





const tasksService = new TasksService();
const tasksStore = new TasksStore(tasksService)


const authService = new AuthService()
const authenticationStore = new AuthenticationStore(authService)

const userDetailsStore = new UserDetailsStore(authService)

const newProjectService = new NewProjectService()
const newProjectStore = new NewProjectStore(newProjectService)

const projectsService = new ProjectsService();
const projectsStore = new ProjectsStore(projectsService);
export default {
   authenticationStore,
   projectsStore,
   newProjectStore,
   tasksStore,
   userDetailsStore,
};
