import { observable, action, reaction } from 'mobx'
import { API_SUCCESS, API_INITIAL } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import ApiCallModel from '../ApiCallModel'

class TaskModel {
   @observable stateOptions
   @observable getApiStatus = API_INITIAL
   @observable getApiError = null
   @observable response = []
   @observable state
   @observable taskTrasitionState = {}
   constructor(task, services) {
      this.taskTrasitionState = new ApiCallModel(
         services.postTaskTransitionValidationAPI
      )
      this.id = task.id
      this.projectName = task.project
      this.issueType = task.issue_type
      this.title = task.title
      this.description = task.description
      this.createdBy = task.created_by
      this.createdAt = task.created_at
      this.state = task.state
      this.stateOptions = [{ id: task.state, name: task.state }]
      this.changeTaskStatusAPI = services.changeTaskStatusAPI
      this.toStatus = null
   }

   changeTaskStateReaction = reaction(
      () => this.taskTrasitionState.getApiStatus,
      apiStatus => {
         if (apiStatus === API_SUCCESS) {
            this.state = this.toStatus
         }
      }
   )

   setApiStatus = status => {
      this.getApiStatus = status
   }

   @action.bound
   setApiResponse(response) {
      if (response.findIndex(option => option.name === this.state) === -1) {
         response.unshift({ id: this.state, to_state: this.state })
      }
      this.stateOptions = response.map(option => {
         return {
            id: option.id,
            name: option.to_state
         }
      })
      console.log(this.stateOptions)
   }

   setApiError = error => {
      this.getApiError = error
   }

   getStatusTransitionOptions = () => {
      const { setApiError, setApiStatus, setApiResponse, state, id } = this
      const response = this.changeTaskStatusAPI({ state, id })
      return bindPromiseWithOnSuccess(response)
         .to(setApiStatus, setApiResponse)
         .catch(setApiError)
   }
}

export default TaskModel
