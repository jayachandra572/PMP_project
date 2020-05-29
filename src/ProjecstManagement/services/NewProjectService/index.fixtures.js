
import workFlowTypesResponse from '../../fixtures/workFlowTypesAPI.json';

class NewProjectService {
    
    workFlowTypesAPI (){
         return new Promise((resolve, reject) => {
         setTimeout(()=> resolve(workFlowTypesResponse), 1000)
      });
    }
    
    postCreateProject (request){
        console.log(request)
         return new Promise((resolve, reject) => {
         setTimeout(()=> resolve({request}), 1000)
      });
    }
}

export default NewProjectService;