export interface UserSignRequest{
    userName:string
    userPassword:string
}

export interface UserSignResponse{
    access_token:string
   user_id:string
   name:string
   expires_in:string
   is_admin:boolean
}

export interface UserDetails{
    "id":number,
    "name":string,
    "profile_pic":string,
    "is_admin":boolean
}