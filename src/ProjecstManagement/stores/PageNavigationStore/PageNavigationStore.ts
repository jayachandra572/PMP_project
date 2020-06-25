import { observable, action, computed } from 'mobx'
import { API_INITIAL, API_SUCCESS, APIStatus } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'


type accessableKeys = {
   entities:string
   totalEntities:string
}
class PageNavigationStore {
   @observable currentPage!:number
   @observable entities:Map<number,any> = new Map()
   @observable offset!:number
   @observable getApiError:Error|null = null
   @observable getApiStatus:APIStatus = API_INITIAL
   responseAccessableKeys:accessableKeys
   entitiesApiServiceFunction:Function
   model:any
   pageLimit:number
   services:object|null
   totalNumberOfPages!:number
   response:object|null = {}
   constructor(serviceFunction:Function, model:any, pageLimit:number, config:accessableKeys,services:object) {
      this.responseAccessableKeys = config
      this.pageLimit = pageLimit
      this.model = model
      this.entitiesApiServiceFunction = serviceFunction
      this.services = services?services:null;
   }

   @action.bound
   init() {
      this.totalNumberOfPages = 1
      this.currentPage = 1
      this.offset = 0
   }
   
   @computed get currentPageEntities():Array<any> {
      const { currentPage, entities } = this
      return entities.get(currentPage)
   }
   
   @action.bound
   updateCurrentPage(number:number) {
      const { pageLimit } = this
      this.currentPage = number
      this.offset = (number - 1) * pageLimit
   }
   
   @action.bound
   navigateToNextPage() {
      const { updateCurrentPage, currentPage } = this
      updateCurrentPage(currentPage + 1)
   }

   @action.bound
   navigateToPreviousPage() {
      const { updateCurrentPage, currentPage } = this
      updateCurrentPage(currentPage - 1)
   }

   @action.bound
   onClickPageNumber(number:number) {
      const { updateCurrentPage } = this
      updateCurrentPage(number)
   }
   
   shouldHaveCurrentPageData = ():boolean =>{
      const {entities, currentPage} = this
      return !entities.has(currentPage)
   }
   
   @action.bound
   setResponseInEntities (data:Array<object>) {
      const { model: Model, currentPage,services } = this
      const pageData = data.map((obj:Object) => new Model(obj,services))
      this.entities.set(currentPage, pageData)
   }

   calculateTotalPages = (totalEntities:number) => {
      const { pageLimit } = this
      this.totalNumberOfPages = Math.ceil(totalEntities / pageLimit)
   }
   
   @action.bound
   setApiStatus(status:number) {
      const {onApiSuccessSetResponse} = this
      this.getApiStatus = status
      if (status === API_SUCCESS) {
         onApiSuccessSetResponse()
      }
   }
   
   @action.bound
   onApiSuccessSetResponse (){
      const {
            setResponseInEntities,
            calculateTotalPages,
            responseAccessableKeys: { entities, totalEntities },
            response
         } = this
         if(response!==null){
            calculateTotalPages(response[totalEntities])
            setResponseInEntities(response[entities])
         }else{
            setResponseInEntities([])
         }
   }

   @action.bound
   setApiResponse(response:object|null) {
      this.response = response
   }
   
   @action.bound
   setApiError ( error:object)  {
      this.getApiError = error
   }

   getEntriesFromApi = (request:object):Promise<any>|undefined => {
      const {
         setApiStatus,
         setApiError,
         setApiResponse,
         entitiesApiServiceFunction,
         shouldHaveCurrentPageData
      } = this
      if (shouldHaveCurrentPageData()) {
         const entriesPromise:Promise<object> = entitiesApiServiceFunction(request)
         return bindPromiseWithOnSuccess(entriesPromise)
            .to(setApiStatus, setApiResponse)
            .catch(setApiError)
      }
   }

   @action.bound
   clearStore(){
      this.init()
   }
}

export default PageNavigationStore
