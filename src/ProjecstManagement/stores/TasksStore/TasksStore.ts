import { observable, reaction, action } from 'mobx'
import { API_SUCCESS } from '@ib/api-constants'

import TasksService from "../../services/TasksService"
import ApiCallModel from '../models/ApiCallModel/index'
import PageNavigationStore from "../PageNavigationStore"
import TaskModel from '../models/TaskModel'
import TaskValidationFieldsModel from '../models/TaskValidationFieldsModel'
import { ValidationFieldObject } from "../type"

type Instantiable = {new(...args: any[]):any}

class TasksStore {
   @observable taskValidationField:ApiCallModel 
   projectId!:string
   tasksService:TasksService
   pageLimit:number
   accessableKeys :{entities:string,totalEntities:string}
   pageNavigation:PageNavigationStore
   postTask:ApiCallModel
   taskTrasitionState:ApiCallModel
   constructor(tasksService:TasksService, PageNavigationStore:Instantiable) {
      
      this.tasksService = tasksService
      this.pageLimit = 3
      this.accessableKeys = {
         entities: 'Tasks',
         totalEntities: 'total_no_of_tasks'
      }
      this.pageNavigation = new PageNavigationStore(
         tasksService.getProjectTaskAPI,
         TaskModel,
         this.pageLimit,
         this.accessableKeys,
         tasksService
      )
   
      this.postTask = new ApiCallModel(tasksService.postProjectTaskAPI)
      this.taskValidationField = new ApiCallModel(
         tasksService.taskValidationFieldAPI
      )
      this.taskTrasitionState = new ApiCallModel(
         tasksService.postTaskTransitionValidationAPI
      )
   }
  

   
   upDateProjectId = (id:string) => {
      this.projectId = id
   }

   taskFieldsReaction = reaction(
      () => {
         if(this.taskValidationField){
            return this.taskValidationField.getApiStatus
         }else{
            return null
         }

      },
      apiStatus => {
         if (apiStatus === API_SUCCESS) {
            const {response} = this.taskValidationField
            if(response!==null){
               this.taskValidationField.response = response.map(
                  (eachField:ValidationFieldObject) => {
                     return new TaskValidationFieldsModel(eachField)
                  }
               )
            }
         }
      }
   )
   @action.bound
   clearStore(){
      this.pageNavigation.clearStore()
   }
}




export default TasksStore
