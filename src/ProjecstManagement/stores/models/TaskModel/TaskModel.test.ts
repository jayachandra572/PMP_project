import {
   API_SUCCESS,
   API_FAILED,
   API_FETCHING,
   API_INITIAL
} from '@ib/api-constants'

import taskResponseData from '../../../fixtures/taskResponseData.json'
import taskStatusChangeResponse from '../../../fixtures/taskStatusChangeResponse.json'

import TaskModel from '.'
import TasksAPIService from "../../../services/TasksService/index.api"

let taskModel:TaskModel

describe('Task model test cases', () => {
   beforeEach(() => {
      const { Tasks } = taskResponseData
     const taskAPiService = new TasksAPIService()
      taskModel = new TaskModel(
         Tasks[0],
         taskAPiService
      )
   })

   it('should test inialization', () => {
      expect(taskModel.getApiStatus).toBe(API_INITIAL)
      expect(taskModel.getApiError).toBe(null)
      expect(taskModel.taskTrasitionState.getApiStatus).toBe(API_INITIAL)
   })

   it('should test changeTaskFetcting status', () => {
      taskModel.taskService.changeTaskStatusAPI = () => new Promise(() => {})
      taskModel.getStatusTransitionOptions()
      expect(taskModel.getApiStatus).toBe(API_FETCHING)
   })

   it('should test changeTaskSuccess status', async () => {
      taskModel.taskService.changeTaskStatusAPI = () =>
         new Promise(resolve => {
            resolve(taskStatusChangeResponse)
         })
      await taskModel.getStatusTransitionOptions()
      expect(taskModel.getApiStatus).toBe(API_SUCCESS)
   })

   it('should test changeTaskFailure status', async () => {
      taskModel.taskService.changeTaskStatusAPI = () =>
         new Promise((_, reject) => {
            reject(new Error('Error'))
      })
      await taskModel.getStatusTransitionOptions()
      expect(taskModel.getApiStatus).toBe(API_FAILED)
   })

   it('Should test change task status', async () => {
      taskModel.taskTrasitionState.apiCallFunction = () =>
         new Promise(resolve => resolve([]))
      taskModel.toStatus = 'InComplete'
      await taskModel.taskTrasitionState.apiCall({})
      expect(taskModel.taskTrasitionState.getApiStatus).toBe(API_SUCCESS)
      expect(taskModel.state).toBe(taskModel.toStatus)
   })
})
