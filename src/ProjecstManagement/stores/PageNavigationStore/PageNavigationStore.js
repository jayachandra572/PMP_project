import { observable, action, computed } from 'mobx'
import { API_INITIAL, API_SUCCESS } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

class PageNavigationStore {
   @observable currentPage
   @observable entities = new Map()
   @observable offset
   @observable getApiError = null
   @observable getApiStatus = API_INITIAL
   response = {}
   constructor(serviceFunction, model, pageLimit, config,services) {
      this.responseAccessableKeys = config
      this.pageLimit = pageLimit
      this.model = model
      this.entitiesApiServiceFunction = serviceFunction
      this.services = services?services:null;
      this.init()
   }

   @action.bound
   init() {
      this.totalNumberOfPages = 1
      this.currentPage = 1
      this.offset = 0
   }
   
   @computed get currentPageEntities() {
      const { currentPage, entities } = this
      return entities.get(currentPage)
   }
   
   @action.bound
   updateCurrentPage(number) {
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
   onClickPageNumber(number) {
      const { updateCurrentPage } = this
      updateCurrentPage(number)
   }
   
   shouldHaveCurrentPageData = () =>{
      const {entities, currentPage} = this
      return !entities.has(currentPage)
   }
   
   @action.bound
   setResponseInEntities (data) {
      const { model: Model, currentPage,services } = this
      const pageData = data.map(obj => new Model(obj,services))
      this.entities.set(currentPage, pageData)
   }

   calculateTotalPages = totalEntities => {
      const { pageLimit } = this
      this.totalNumberOfPages = Math.ceil(totalEntities / pageLimit)
   }
   
   @action.bound
   setApiStatus(status) {
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
         calculateTotalPages(response[totalEntities])
         setResponseInEntities(response[entities])
   }

   @action.bound
   setApiResponse(response) {
      this.response = response
   }
   
   @action.bound
   setApiError ( error)  {
      this.getApiError = error
   }

   getEntriesFromApi = request => {
      const {
         setApiStatus,
         setApiError,
         setApiResponse,
         entitiesApiServiceFunction,
         shouldHaveCurrentPageData
      } = this
      if (shouldHaveCurrentPageData()) {
         const entriesPromise = entitiesApiServiceFunction(request)
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
