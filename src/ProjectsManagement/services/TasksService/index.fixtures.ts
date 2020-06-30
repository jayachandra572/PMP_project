import taskResponseData from '../../fixtures/taskResponseData.json'
import taskStatusChangeResponse from '../../fixtures/taskStatusChangeResponse.json'
import taskValidateFieldResponse from '../../fixtures/taskValidateFieldResponse.json'

import TasksService from "."
import { resolveWithTimeout } from "../../../Common/utils/TestUtils"

class TasksAPIService implements TasksService  {

   getProjectTaskAPI(request) {
      const { limit, offset } = request
      const Tasks = taskResponseData.Tasks.slice().splice(offset, limit)
      return resolveWithTimeout({ ...taskResponseData, Tasks })
   }

   postProjectTaskAPI() {
      return resolveWithTimeout('ok')
   }

   changeTaskStatusAPI = () => {
      return resolveWithTimeout(taskStatusChangeResponse)
   }

   taskValidationFieldAPI = () => {
      return resolveWithTimeout(taskValidateFieldResponse)
   }

   postTaskTransitionValidationAPI = () => {
      return resolveWithTimeout('Ok')
   }
}

export default TasksAPIService
