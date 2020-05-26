import AuthenticationStore from "../Authentication/stores/AuthenticationStore"
import AuthService from "../Authentication/services/AuthService/index.api";

const authService  = new AuthService();
const authenticationStore = new AuthenticationStore(authService);

export default {
    authenticationStore
};