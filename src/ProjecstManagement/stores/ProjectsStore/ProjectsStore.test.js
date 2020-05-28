import {
   API_SUCCESS,
   API_FAILED,
   API_FETCHING,
   API_INITIAL
} from '@ib/api-constants'

import {  waitFor } from '@testing-library/react'

import ProjectsService from "../../services/ProjectsService/index.fixtures"
import ProjectsStore from "."

describe('ProjectsStore test cases', () => {
   let projectsStore
   let projectsService
 
   beforeEach(() => {
      projectsService = new ProjectsService()
      projectsStore = new ProjectsStore(projectsService)
   })
   
    it('should test intialisation', () => {
      expect(projectsStore.getProjectsApiStatus).toBe(API_INITIAL)
      expect(projectsStore.getProjectsApiError).toBe(null)
   })
   
   it('Should test projectsAPI fecting status', () => {
      const mockFetchingPromise = new Promise((resolve, reject) => {})
      let mockprojectsAPI = jest.fn()
      mockprojectsAPI.mockReturnValue(mockFetchingPromise)
      projectsService.projectsAPI = mockprojectsAPI
      projectsStore.getProjectsFromAPi()
      expect(projectsStore.getProjectsApiStatus).toBe(API_FETCHING)
   })
   
   it('Should test projectsAPI success status', async () => {
      const mockSuccessPromise = new Promise((resolve, reject) => {resolve({projects:[]})})
      let mockprojectsAPI = jest.fn()
      mockprojectsAPI.mockReturnValue(mockSuccessPromise)
      projectsService.projectsAPI = mockprojectsAPI
      projectsStore.getProjectsFromAPi()
     await waitFor(()=>{
         expect(projectsStore.getProjectsApiStatus).toBe(API_SUCCESS) })
   })
   
   it('Should test projectsAPI failure status', async() => {
        const mockError = 'Error'
      const mockFailurePromise = new Promise((resolve, reject) => {
           throw new Error(mockError)
      })
      let mockprojectsAPI = jest.fn()
      mockprojectsAPI.mockReturnValue(mockFailurePromise)
      projectsService.projectsAPI = mockprojectsAPI
      projectsStore.getProjectsFromAPi()
      await waitFor(()=>{
          expect(projectsStore.getProjectsApiStatus).toBe(API_FAILED)
          expect(projectsStore.getProjectsApiError).toBe(mockError)
      })
   })
   
   it("Should test activePageProjects ",()=>{
       projectsStore.offset = 0;
       projectsStore.projectsPerPage = 3
       projectsStore.projects = [{"1":1},{"2":2},{"3":3},{"4":4},{"5":5}]
       const expectedOutput = [{"1":1},{"2":2},{"3":3}]
       expect(projectsStore.activePageProjects).toEqual(expectedOutput)
   })
    it("Should test navigateToNextPage function",()=>{
        const mockProjectsPerPage =3
        projectsStore.activePageNumber =1
        projectsStore.offset = 0;
        projectsStore.projectsPerPage = mockProjectsPerPage
        projectsStore.totalNoOfProjects = 5;
        projectsStore.navigateToNextPage()
        expect(projectsStore.activePageNumber).toBe(2)
        expect(projectsStore.offset).toBe(mockProjectsPerPage)
    })
    
    it("Should test navigateToPreviousPage function",()=>{
        const mockProjectsPerPage =3
        projectsStore.activePageNumber =2
        projectsStore.offset = 3;
        projectsStore.projectsPerPage = mockProjectsPerPage
        projectsStore.totalNoOfProjects = 5;
        projectsStore.navigateToPreviousPage()
        expect(projectsStore.activePageNumber).toBe(1)
        expect(projectsStore.offset).toBe(0)
    })
    
     it("Should test onClickPageNumber function",()=>{
        const mockProjectsPerPage =3
        projectsStore.projectsPerPage = mockProjectsPerPage
        projectsStore.onClickPageNumber(1)
        expect(projectsStore.activePageNumber).toBe(1)
        expect(projectsStore.offset).toBe(0)
    })
})