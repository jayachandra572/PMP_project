import { observable, reaction,  toJS } from 'mobx'
import { API_SUCCESS } from '@ib/api-constants'

import ApiCallModel from '../models/ApiCallModel/index'
import TaskModel from '../models/TaskModel'
import TaskValidationFieldsModel from '../models/TaskValidationFieldsModel'

class TasksStore {
   @observable taskValidationField = {}
   constructor(tasksService,PageNavigationStore) {
      this.init()
      this.tasksService = tasksService
      this.pageLimit = 3
      this.accessableKeys = {entities:"Tasks",totalEntities:"total_no_of_tasks"}
      this.pageNavigation = new PageNavigationStore(tasksService.getProjectTaskAPI,TaskModel, this.pageLimit,this.accessableKeys)
      this.postTask = new ApiCallModel(tasksService.postProjectTaskAPI)
      this.taskValidationField = new ApiCallModel(tasksService.taskValidationFieldAPI)
      this.taskTrasitionState = new ApiCallModel(tasksService.postTaskTransitionValidationAPI)
   }
   init = () => {
      this.projectId = 0
   }

   upDateProjectId = id => {
      this.projectId = id
   }

   taskFieldsReaction = reaction(
      () => this.taskValidationField.getApiStatus,
      apiStatus => {
         if (apiStatus === API_SUCCESS) {
            this.taskValidationField.response = this.taskValidationField.response.map(
               eachField => {
                  return new TaskValidationFieldsModel(eachField)
               }
            )
         }
      }
   )


}

export default TasksStore
