import { create } from 'apisauce'
import { networkCallWithApisauce } from '../../../Common/utils/APIUtils'
import { apiMethods } from '../../../Common/constants/APIConstants'

import APIService from '../../constants/APIService'
import { Tasks, postProjectTask, changeTaskStatus } from '../EndPoints'

class TasksService {
   constructor() {
      this.api = create({
         baseURL: APIService.baseUrl
      })
   }
   getProjectTaskAPI = projectId => {
      const { api } = this
      return networkCallWithApisauce(api, Tasks, { projectId }, apiMethods.get)
   }

   postProjectTask = taskRequest => {
      const { api } = this
      return networkCallWithApisauce(
         api,
         postProjectTask,
         { taskRequest },
         apiMethods.post
      )
   }

   changeTaskStatusAPI = toStatus => {
      const { api } = this
      return networkCallWithApisauce(
         api,
         changeTaskStatus,
         toStatus,
         apiMethods.post
      )
   }

   taskValidationFieldAPI = request => {
      const { api } = this
      return networkCallWithApisauce(api, '', request, apiMethods.post)
   }

   postTaskTransitionValidationAPI = request => {
      console.log(request)
      const { api } = this
      return networkCallWithApisauce(api, '', request, apiMethods.post)
   }
}

export default TasksService
