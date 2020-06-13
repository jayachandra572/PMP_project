import { observable, reaction, action } from 'mobx'
import { API_INITIAL, API_SUCCESS } from '@ib/api-constants'
import ApiCallModel from '../models/ApiCallModel'

class CreateTaskStore {
   @observable taskTitle
   @observable issueType = null
   @observable description
   @observable errorMessage
   @observable modalOpen = false

   @observable postTask = {}
   constructor(tasksService) {
      this.postTask = new ApiCallModel(tasksService.postProjectTask)
      this.init()
   }

   @action.bound
   init() {
      this.taskTitle = ''
      this.description = ''
      this.errorMessage = {}
   }

   @action.bound
   onChangeTaskTitle(event) {
      this.taskTitle = event.target.value
      this.checkTaskTitle()
   }

   @action.bound
   onChangeIssueType(event, data) {
      this.issueType = data.value
      this.checkIssueType()
   }

   @action.bound
   onChangeDescription(event) {
      this.description = event.target.value
      this.checkDescription()
   }

   checkTaskTitle = () => {
      const { taskTitle } = this
      this.errorMessage.taskTitleEmpty = taskTitle === ''
   }

   checkIssueType = () => {
      const { issueType } = this
      this.errorMessage.issueTypeError = issueType === null
   }

   checkDescription = () => {
      const { description } = this
      this.errorMessage.descriptionError = description === ''
   }

   anyErrorInPage = () => {
      const {
         descriptionError,
         issueTypeError,
         taskTitleEmpty
      } = this.errorMessage
      return descriptionError || issueTypeError || taskTitleEmpty
   }

   @action.bound
   submitTask() {
      const { postTask } = this
      const {
         checkTaskTitle,
         checkDescription,
         checkIssueType,
         anyErrorInPage
      } = this
      checkTaskTitle()
      checkIssueType()
      checkDescription()
      if (!anyErrorInPage()) {
         const { taskTitle, issueType, description } = this
         postTask.apiCall({ taskTitle, issueType, description })
      }
   }

   reaction1 = reaction(
      () => this.postTask.getApiStatus,
      apiStatus => {
         if (apiStatus === API_SUCCESS) {
            this.handleClose()
            this.init()
         }
      }
   )

   handleOpen = () => (this.modalOpen = true)
   handleClose = () => (this.modalOpen = false)
}

export default CreateTaskStore
