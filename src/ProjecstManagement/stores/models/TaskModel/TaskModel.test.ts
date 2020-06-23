import {
   API_SUCCESS,
   API_FAILED,
   API_FETCHING,
   API_INITIAL
} from '@ib/api-constants'

import taskResponseData from '../../../fixtures/taskResponseData.json'
import taskStatusChangeResponse from '../../../fixtures/taskStatusChangeResponse.json'

import TaskModel from '.'

let taskModel

describe('Task model test cases', () => {
   beforeEach(() => {
      const { Tasks } = taskResponseData
      const changeTaskStatusAPI = () => {}
      const postTaskTransitionValidationAPI = () => {}
      taskModel = new TaskModel(
         Tasks[0],
         changeTaskStatusAPI,
         postTaskTransitionValidationAPI
      )
   })

   it('should test inialization', () => {
      expect(taskModel.getApiStatus).toBe(API_INITIAL)
      expect(taskModel.getApiError).toBe(null)
      expect(taskModel.taskTrasitionState.getApiStatus).toBe(API_INITIAL)
   })

   it('should test changeTaskFetcting status', () => {
      const mockFetchingPromiseFn = () => new Promise(() => {})
      taskModel.changeTaskStatusAPI = mockFetchingPromiseFn
      taskModel.getStatusTransitionOptions()
      expect(taskModel.getApiStatus).toBe(API_FETCHING)
   })

   it('should test changeTaskSuccess status', async () => {
      const mockSuccessPromiseFn = () =>
         new Promise(resolve => {
            resolve(taskStatusChangeResponse)
         })
      taskModel.changeTaskStatusAPI = mockSuccessPromiseFn
      await taskModel.getStatusTransitionOptions()
      expect(taskModel.getApiStatus).toBe(API_SUCCESS)
   })

   it('should test changeTaskFailure status', async () => {
      const mockFailurePromiseFn = () =>
         new Promise((_, reject) => {
            reject(new Error('Error'))
         })
      taskModel.changeTaskStatusAPI = mockFailurePromiseFn
      await taskModel.getStatusTransitionOptions()
      expect(taskModel.getApiStatus).toBe(API_FAILED)
   })

   it('Should test change task status', async () => {
      taskModel.taskTrasitionState.apiCallFunction = () =>
         new Promise(resolve => resolve([]))
      taskModel.toStatus = 'InComplete'
      await taskModel.taskTrasitionState.apiCall()
      expect(taskModel.taskTrasitionState.getApiStatus).toBe(API_SUCCESS)
      expect(taskModel.state).toBe(taskModel.toStatus)
   })
})
