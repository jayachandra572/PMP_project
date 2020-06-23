import { observable, action, reaction } from 'mobx'
import { API_SUCCESS, API_INITIAL } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import ApiCallModel from '../ApiCallModel'

type stateOptionsType = {
   id:string
   name:string
}

type taskCommonType = {
   id:string
   title:string
   description:string
   state:string
}

interface taskObjectType extends taskCommonType {
   issue_type:string
   created_by:object
   project:string
   created_at:string
}

interface taskModelInstancesType extends taskCommonType{
   issueType:string
   createdBy:object
   projectName:string
   createdAt:string
   stateOptions :Array<stateOptionsType>
   changeTaskStatusAPI:Function
   toStatus:null|string

}



class TaskModel{
   @observable stateOptions:Array<stateOptionsType>
   @observable getApiStatus:number = API_INITIAL
   @observable getApiError:object|null = null
   @observable response:Array<any> = []
   @observable state:string
   @observable taskTrasitionState = {}
   id
   projectName
   issueType
   title
   description
   createdBy
   createdAt
   changeTaskStatusAPI
   toStatus
   constructor(task:taskObjectType, services:any) {
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
         response.unshift({ id: this.state, name: this.state })
      }
      this.stateOptions = response
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
