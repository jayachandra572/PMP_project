import AuthenticationStore from "../Authentication/stores/AuthenticationStore"
import AuthService from "../Authentication/services/AuthService/index.fixture";

const authService  = new AuthService();
const authenticationStore = new AuthenticationStore(authService);

export default {
    authenticationStore
};