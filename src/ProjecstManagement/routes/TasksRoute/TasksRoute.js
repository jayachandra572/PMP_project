import React, { Component } from 'react'
import { API_SUCCESS } from '@ib/api-constants'
import { observer, inject } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { reaction, computed } from 'mobx'
import { getLoadingStatus } from '@ib/api-utils'
import LoadingWrapperWithFailure from '../../../Common/components/LoadingWrapperWithFailure'
import { PROJECT_ROUTE } from '../../constants/RouteConstants'
import ProjectTasks from '../../components/ProjectTasks'
import { goToProjectsPage } from '../../utils/navigationUtils'

@inject('tasksStore', 'userDetailsStore')
@observer
class TasksRoute extends Component {
   componentDidMount() {
      this.doNetWorkCall()
   }

   doNetWorkCall = () => {
      const { projectId } = this.props.tasksStore
      const {
         getEntriesFromApi,
         pageLimit,
         offset
      } = this.props.tasksStore.pageNavigation
      const {
         getUserDetailsApiStatus,
         getUserDetailsApi
      } = this.props.userDetailsStore
      if (getUserDetailsApiStatus !== API_SUCCESS) {
         getUserDetailsApi()
      }
      getEntriesFromApi({ id: projectId, offset, limit: pageLimit })
   }

   updateTaskReaction = reaction(
      () => this.props.tasksStore.postTask.getApiStatus,
      apiStatus => {
         if (apiStatus === API_SUCCESS) {
            this.doNetWorkCall()
         }
      }
   )


   componentWillUnmount() {
      this.onCreateTaskReactionDeposer()
      this.props.tasksStore.init()
      this.onChangePageNumberReaction()
   }

   onChangePageNumberReaction = reaction(
      () => this.props.tasksStore.pageNavigation.currentPage,
      pageNumber => {
         this.doNetWorkCall()
      }
   )

   onCreateTaskReactionDeposer = reaction(
      () => this.props.tasksStore.taskTrasitionState.getApiStatus,
      apiStatus => {
         if (apiStatus === API_SUCCESS) {
            this.doNetWorkCall()
         }
      }
   )

   componentDidMount() {
      const { upDateProjectId } = this.props.tasksStore
      const {
         params: { id }
      } = this.props.match
      upDateProjectId(id)
      this.doNetWorkCall()
   }

   backToProjectsPage = () => {
      const { history } = this.props
      goToProjectsPage(history)
   }

   renderSuccessUI = observer(() => {
      const {
         currentPageEntities,
         totalNumberOfPages,
         currentPage,
         navigateToNextPage,
         navigateToPreviousPage,
         onClickPageNumber,
         pageLimit,
         getApiStatus,
         getApiError
      } = this.props.tasksStore.pageNavigation
      const { taskValidationField } = this.props.tasksStore
      return (
         <ProjectTasks
            backToProjectsPage={this.backToProjectsPage}
            projectTasks={currentPageEntities}
            taskValidationField={taskValidationField}
            apiStatus={getApiStatus}
            apiError={getApiError}
            doNetWorkCall={this.doNetWorkCall}
            activePageNumber={currentPage}
            totalNumberOfPages={totalNumberOfPages}
            navigateToNextPage={navigateToNextPage}
            navigateToPreviousPage={navigateToPreviousPage}
            onClickPageNumber={onClickPageNumber}
         />
      )
   })

   @computed get getApiStatus() {
      const { getUserDetailsApiStatus } = this.props.userDetailsStore
      const { getApiStatus } = this.props.tasksStore.pageNavigation
      if (getUserDetailsApiStatus === API_SUCCESS) {
         return getUserDetailsApiStatus
      } else {
         return getLoadingStatus(getUserDetailsApiStatus, getApiStatus)
      }
   }

   render() {
      const { getUserDetailsApiError } = this.props.userDetailsStore
      return (
         <LoadingWrapperWithFailure
            apiStatus={this.getApiStatus}
            apiError={getUserDetailsApiError}
            onRetryClick={this.doNetWorkCall}
            renderSuccessUI={this.renderSuccessUI}
         />
      )
   }
}

export default withRouter(TasksRoute)
