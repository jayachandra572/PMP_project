import { observable, reaction, action } from 'mobx'
import { API_SUCCESS } from '@ib/api-constants'

import ApiCallModel from '../models/ApiCallModel/index'
import TaskModel from '../models/TaskModel'
import TaskValidationFieldsModel from '../models/TaskValidationFieldsModel'

class TasksStore {
   @observable projectTasks = []
   @observable tasks = {}
   @observable taskValidationField = {}
   @observable activePageNumber = 1
   @observable offset = 0
   constructor(tasksService) {
      this.init()
      this.tasksService = tasksService
      this.tasks = new ApiCallModel(tasksService.getProjectTaskAPI)
      this.postTask = new ApiCallModel(tasksService.postProjectTaskAPI)
      this.taskValidationField = new ApiCallModel(
         tasksService.taskValidationFieldAPI
      )
      this.taskTrasitionState = new ApiCallModel(
         tasksService.postTaskTransitionValidationAPI
      )
   }
   init = () => {
      this.totalNoOfTasks = 0
      this.totalNumberOfPages = 1
      this.tasksPerPage = 2
   }

   calculateTotalNumberOfPages = totalNoOfTasks => {
      this.totalNoOfTasks = totalNoOfTasks
      const { tasksPerPage } = this
      this.totalNumberOfPages = Math.ceil(totalNoOfTasks / tasksPerPage)
   }

   projectTasksReaction = reaction(
      () => this.tasks.getApiStatus,
      apiStatus => {
         if (apiStatus === API_SUCCESS) {
            this.projectTasks = this.tasks.response.tasks.map(task => {
               return new TaskModel(
                  task,
                  this.tasksService.changeTaskStatusAPI,
                  this.tasksService.postTaskTransitionValidationAPI
               )
            })
            this.calculateTotalNumberOfPages(this.tasks.response.no_of_tasks)
         }
      }
   )

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

   @action.bound
   navigateToPreviousPage() {
      const { tasksPerPage, offset } = this
      if (0 <= offset - tasksPerPage) {
         this.offset -= tasksPerPage
         this.activePageNumber--
      }
   }

   @action.bound
   onClickPageNumber(number) {
      const { tasksPerPage } = this
      this.activePageNumber = number
      this.offset = (number - 1) * tasksPerPage
   }
   @action.bound
   navigateToNextPage() {
      const { totalNoOfTasks, tasksPerPage, offset } = this
      if (totalNoOfTasks > offset + tasksPerPage) {
         this.offset += tasksPerPage
         this.activePageNumber++
      }
   }
}

export default TasksStore
