import {observable,action,computed} from "mobx"
import { API_INITIAL ,API_SUCCESS} from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

class PageNavigationStore {
    @observable currentPage
    @observable entities = new Map()
    @observable offset
    @observable getApiError = null
    @observable getApiStatus = API_INITIAL
    response = {}
    constructor(serviceFunction,model,pageLimit,config){
        this.responseAccessableKeys = config;
        this.pageLimit = pageLimit;
        this.model = model;
        this.entitiesApiServiceFunction = serviceFunction;
        this.init();
    }
    
    @action.bound
    init () {
        this.totalNumberOfPages = 1;
        this.currentPage =1;
        this.offset = 0;
    }
    
    setResponseInEntities = (data) =>{
        const {model:Model , currentPage} = this;
        const pageData = data.map(obj=> new Model(obj));
        this.entities.set(currentPage,pageData);
    }
    
    calculateTotalPages = (totalEntities)=>{
        const {pageLimit} = this;
        this.totalNumberOfPages = Math.ceil(totalEntities/pageLimit);
    }
    
    setApiError = error => {
        this.getApiError = error;
    }
    
    @action.bound
    setApiResponse  (response) {
        this.response = response;
    }
    
    @action.bound
    setApiStatus ( status) {
        const {response} = this;
         this.getApiStatus = status;
        if(status === API_SUCCESS){
            const {setResponseInEntities,calculateTotalPages,responseAccessableKeys:{entities,totalEntities}} = this;
            calculateTotalPages(response[totalEntities]);
            setResponseInEntities (response[entities]);
        }
    }
      
    getEntriesFromApi = (request)=>{
        const {
            setApiStatus,
            setApiError,
            setApiResponse,
            entitiesApiServiceFunction,
            currentPage,
            entities
        }=this;
        if(!entities.has(currentPage)){
            const entriesPromise = entitiesApiServiceFunction(request);
            return bindPromiseWithOnSuccess(entriesPromise)
            .to(setApiStatus,setApiResponse)
            .catch(setApiError);
        }
    }
    
    @action.bound
   navigateToNextPage() {
       const {updateCurrentPage,currentPage} = this
       updateCurrentPage(currentPage+1)
    }
   
    @action.bound
   navigateToPreviousPage() {
        const {updateCurrentPage,currentPage } = this;
        updateCurrentPage(currentPage-1)
   }
   
   @action.bound
   onClickPageNumber(number) {
      const {updateCurrentPage } = this;
      updateCurrentPage(number)
   }
   
   @action.bound
   updateCurrentPage (number){
        const {pageLimit} = this;
        this.currentPage = number;
        this.offset = (number - 1) * pageLimit;
   }
   @computed get 
   currentPageEntities (){
        const {currentPage,entities} = this;
        return entities.get(currentPage);
   }
}


export default PageNavigationStore;