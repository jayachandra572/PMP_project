import {create} from "apisauce";
import {networkCallWithApisauce} from "../../../Common/utils/APIUtils";
import {apiMethods} from "../../../Common/constants/APIConstants";

import APIService from "../../constants/APIService";
import {Projects} from "../EndPoints";

class ProjectsService{
    constructor(){
        this.api=create({
            baseURL:APIService.baseUrl
        });
    }
    getProductAPI=(limit,offset)=>{
        const {api}=this;
        const params = `?limit=${limit}&offset=${offset}`;
        const endPoint = Projects+params;
        return networkCallWithApisauce(api,endPoint,{},apiMethods.get);
    }
}

export default ProjectsService;