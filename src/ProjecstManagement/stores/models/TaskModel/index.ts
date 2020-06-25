import { observable, action, reaction } from 'mobx'
import { API_SUCCESS, API_INITIAL } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

import { TaskObject, StatusObject, CreatedBy } from "../../type"

import ApiCallModel from '../ApiCallModel'
import TasksService from "../../../services/TasksService"

class TaskModel{
   @observable stateOptions:Array<StatusObject>
   @observable getApiStatus:number = API_INITIAL
   @observable getApiError:Error|null = null
   @observable state:string
   @observable taskTrasitionState:ApiCallModel
   id:string
   projectName:string
   issueType:string
   title:string
   description:string
   createdBy:CreatedBy
   createdAt:string
   taskService:TasksService
   toStatus:string
   constructor(task:TaskObject, services:TasksService) {
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
      this.taskService = services
      this.toStatus = ""
   }

   changeTaskStateReaction = reaction(
      () => this.taskTrasitionState.getApiStatus,
      apiStatus => {
         if (apiStatus === API_SUCCESS) {
            this.state = this.toStatus
         }
      }
   )

   upDateToStatus = (toStatus:string) => {
      this.toStatus = toStatus
   }
   
   @action.bound
   setApiStatus (status:number) {
      this.getApiStatus = status
   }
   
    @action.bound
   setApiResponse(response:Array<StatusObject>|null) {
      if(response){
         if (response.findIndex(option => option.name === this.state) === -1) {
            response.unshift({ id: this.state, name: this.state })
         }
         this.stateOptions = response
      }else{
         this.stateOptions =[]
      }
   }
   
   @action.bound
   setApiError (error)  {
      this.getApiError = error
   }

   getStatusTransitionOptions = () => {
      const { setApiError, setApiStatus, setApiResponse, state, id } = this
      const promise = this.taskService.changeTaskStatusAPI({ status:state, id })
      return bindPromiseWithOnSuccess(promise)
         .to(setApiStatus, setApiResponse)
         .catch(setApiError)
   }
}

export default TaskModel
