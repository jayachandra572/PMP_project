import taskResponseData from '../../fixtures/taskResponseData.json'
import taskStatusChangeResponse from '../../fixtures/taskStatusChangeResponse.json'
import taskValidateFieldResponse from '../../fixtures/taskValidateFieldResponse.json'
import { toJS } from 'mobx'

class TasksService {
   getProjectTaskAPI(request) {
      const { limit, offset } = request
      const Tasks = taskResponseData.Tasks.slice().splice(offset, limit)
      return new Promise((resolve, reject) => {
         setTimeout(() => resolve({ ...taskResponseData, Tasks }), 1000)
      })
   }

   postProjectTaskAPI(request) {
      console.log(request)
      return new Promise(resolve => {
         setTimeout(() => resolve(), 1000)
      })
   }

   changeTaskStatusAPI = toStatus => {
      return new Promise((resolve, reject) => {
         setTimeout(() => resolve(taskStatusChangeResponse), 1000)
      })
   }

   taskValidationFieldAPI = request => {
      console.log(request)
      return new Promise(resolve => {
         setTimeout(() => resolve(taskValidateFieldResponse), 2000)
      })
   }

   postTaskTransitionValidationAPI = request => {
      console.log(toJS(request), 'response')
      return new Promise((resolve, reject) => {
         setTimeout(() => resolve('Error'), 2000)
      })
   }
}

export default TasksService
