import { UserSignRequest, UserSignResponse,UserDetails } from "../../stores/types";

interface AuthService{
    signInAPI:(request:UserSignRequest)=>Promise<UserSignResponse>
    getUserDetails :() => Promise<UserDetails>
}

export default AuthService
