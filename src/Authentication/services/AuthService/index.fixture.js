import userSignInResponse from "../../fixtures/getUserSignInResponse.json";

class AuthService{
    signAPI(request){
        return new Promise((resolve,reject)=>{
                resolve(userSignInResponse);
            });
    }
}

export default AuthService;