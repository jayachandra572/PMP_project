import AuthenticationStore from '../Authentication/stores/AuthenticationStore'
import AuthService from '../Authentication/services/AuthService/index.fixture'

import ProjectsStore from '../ProjecstManagement/stores/ProjectsStore'
import ProjectsService from '../ProjecstManagement/services/ProjectsService/index.fixtures'

const authService = new AuthService()
const authenticationStore = new AuthenticationStore(authService)

const projectsService = new ProjectsService();
const projectsStore = new ProjectsStore(projectsService);
export default {
   authenticationStore,
   projectsStore
};
