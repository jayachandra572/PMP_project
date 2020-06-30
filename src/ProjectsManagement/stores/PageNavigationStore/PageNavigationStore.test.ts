import {
   API_SUCCESS,
   API_FAILED,
   API_FETCHING,
   API_INITIAL
} from '@ib/api-constants'

import projectResponseData from '../../fixtures/projectResponseData.json'
import ProjectModel from '../models/ProjectModel'
import PageNavigationStore from '.'

type accessableKeys = {
   entities:string
   totalEntities:string
}

let pageNavigationStore:PageNavigationStore
let pageLimit:number = 3
let config:accessableKeys = { entities: 'projects', totalEntities: 'total_no_of_projects' }
const serviceFunction:Function = () => {}
const requestObject:object = {}

describe('PageNavigationStore Test cases', () => {
   beforeEach(() => {
      pageNavigationStore = new PageNavigationStore(
         serviceFunction,
         ProjectModel,
         pageLimit,
         config,
         {}
      )
   })

   it('should test inialisation of pageNavigationStore varibles', () => {
      const {
         pageLimit,
         model,
         responseAccessableKeys,
         entitiesApiServiceFunction,
         getApiStatus,
         getApiError
      } = pageNavigationStore
      expect(pageLimit).toBe(pageLimit)
      expect(model).toEqual(ProjectModel)
      expect(responseAccessableKeys).toEqual(config)
      expect(entitiesApiServiceFunction).toBe(serviceFunction)
      expect(getApiStatus).toBe(API_INITIAL)
      expect(getApiError).toBe(null)
   })

   it('should test fetching entities from network call', () => {
      pageNavigationStore.entitiesApiServiceFunction = ():Promise<null> =>
         new Promise(() => {})
      pageNavigationStore.getEntriesFromApi(requestObject)
      const { getApiStatus, currentPageEntities } = pageNavigationStore
      expect(getApiStatus).toBe(API_FETCHING)
      expect(currentPageEntities).toBe(undefined)
   })

   it('should test success entities from network call', async () => {
      pageNavigationStore.entitiesApiServiceFunction = ():Promise<object> =>
         new Promise(resolve => {
            resolve(projectResponseData)
         })
      await pageNavigationStore.getEntriesFromApi(requestObject)
      const { getApiStatus, entities, currentPage } = pageNavigationStore
      expect(getApiStatus).toBe(API_SUCCESS)
      expect(entities.has(currentPage)).toBe(true)
   })

   it('should test failure response of entities  network call', async () => {
      const errorMessage = 'Error'
      pageNavigationStore.entitiesApiServiceFunction = ():Promise<object> =>
         new Promise((_, reject) => {
            reject(new Error(errorMessage))
         })
      await pageNavigationStore.getEntriesFromApi(requestObject)
      const { getApiStatus, getApiError } = pageNavigationStore
      expect(getApiStatus).toBe(API_FAILED)
      expect(getApiError).toBe(errorMessage)
   })

   it('should test page changes function calls ', () => {
      expect(pageNavigationStore.currentPage).toBe(1)
      pageNavigationStore.navigateToNextPage()
      expect(pageNavigationStore.currentPage).toBe(2)
      pageNavigationStore.navigateToPreviousPage()
      expect(pageNavigationStore.currentPage).toBe(1)
   })
})
