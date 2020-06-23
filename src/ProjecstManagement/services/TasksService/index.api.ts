import { create } from 'apisauce'
import { networkCallWithApisauceWithAccessToken } from '../../../Common/utils/APIUtils'
import { apiMethods } from '../../../Common/constants/APIConstants'

import ServiceConstants from '../../constants/ServiceConstants'
import {
   getTasks,
   createProjectTaskEndPoint,
   changeTaskStatusEndPoint
} from '../EndPoints'

class TasksService {
   api:object
   constructor() {
      this.api = create({
         baseURL: ServiceConstants.baseURL
      })
   }
   getProjectTaskAPI = request => {
      console.log('service')
      const { api } = this
      const { id, offset, limit } = request
      const getTasksEndPoint = `/user/${id}/tasks/v1/?offset=${offset}&limit=${limit}`
      return networkCallWithApisauceWithAccessToken(
         api,
         getTasksEndPoint,
         {},
         apiMethods.get
      )
   }

   postProjectTaskAPI = taskRequest => {
      const { projectId, taskTitle, issueType, description } = taskRequest
      const { api } = this

      const requestObj = {
         project_id: projectId,
         issue_type: issueType,
         title: taskTitle,
         description
      }
      return networkCallWithApisauceWithAccessToken(
         api,
         createProjectTaskEndPoint,
         requestObj,
         apiMethods.post
      )
   }

   changeTaskStatusAPI = request => {
      const { id, state } = request
      const { api } = this
      const endPoint = `/project/${id}/${state}/states/v1/`
      return networkCallWithApisauceWithAccessToken(
         api,
         endPoint,
         {},
         apiMethods.get
      )
   }

   taskValidationFieldAPI = request => {
      const { fromStatus, toStatus, id } = request
      const { api } = this
      const endPoint = `/project/${id}/${fromStatus}/${toStatus}/checklist/v1/`
      return networkCallWithApisauceWithAccessToken(
         api,
         endPoint,
         request,
         apiMethods.get
      )
   }

   postTaskTransitionValidationAPI = request => {
      const { fromStatus, toStatus, validateArrayIds, taskId } = request
      const requestObj = {
         from_state: fromStatus,
         to_state: toStatus,
         satisfied_checklist: validateArrayIds
      }
      const { api } = this
      const endPoint = `/project/${taskId}/state/update/v1/`
      return networkCallWithApisauceWithAccessToken(
         api,
         endPoint,
         requestObj,
         apiMethods.put
      )
   }
}

export default TasksService
