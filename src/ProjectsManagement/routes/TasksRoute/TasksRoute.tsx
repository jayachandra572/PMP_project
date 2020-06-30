import React, { Component } from 'react'
import { API_SUCCESS } from '@ib/api-constants'
import { observer, inject } from 'mobx-react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { reaction, computed } from 'mobx'
import { getLoadingStatus } from '@ib/api-utils'

import LoadingWrapperWithFailure from '../../../Common/components/LoadingWrapperWithFailure'
import UserDetailsStore from '../../../Authentication/stores/UserDetailsStore'

import ProjectTasks from '../../components/ProjectTasks'
import { goToProjectsPage } from '../../utils/navigationUtils'
import TasksStore from '../../stores/TasksStore'

import { ProjectContainer } from './stylesComponent'

interface MatchParams {
   id: string
}
interface TasksRouteProps extends RouteComponentProps<MatchParams> {}

interface InjectedProps extends TasksRouteProps {
   tasksStore: TasksStore
   userDetailsStore: UserDetailsStore
}

@inject('tasksStore', 'userDetailsStore')
@observer
class TasksRoute extends Component<TasksRouteProps> {
   componentDidMount() {
      const { upDateProjectId } = this.injectedProps.tasksStore
      const {
         params: { id }
      } = this.props.match
      upDateProjectId(id)
      this.doNetWorkCall()
   }

   get injectedProps() {
      return this.props as InjectedProps
   }

   componentWillUnmount() {
      const { tasksStore, userDetailsStore } = this.injectedProps
      this.onCreateTaskReactionDeposer()
      this.onChangePageNumberReaction()
      tasksStore.taskFieldsReaction()
      tasksStore.clearStore()
      userDetailsStore.clearStore()
   }

   @computed get getApiStatus(): number {
      const { getUserDetailsApiStatus } = this.injectedProps.userDetailsStore
      const { getApiStatus } = this.injectedProps.tasksStore.pageNavigation
      if (getUserDetailsApiStatus === API_SUCCESS) {
         return getUserDetailsApiStatus
      } else {
         return getLoadingStatus(getUserDetailsApiStatus, getApiStatus)
      }
   }

   doNetWorkCall = () => {
      const {
         tasksStore,
         tasksStore: { pageNavigation },
         userDetailsStore
      } = this.injectedProps
      const { projectId } = tasksStore
      const { getEntriesFromApi, pageLimit, offset } = pageNavigation
      const { getUserDetailsApiStatus, getUserDetailsApi } = userDetailsStore
      if (getUserDetailsApiStatus !== API_SUCCESS) {
         getUserDetailsApi()
      }
      getEntriesFromApi({ id: projectId, offset, limit: pageLimit })
   }

   backToProjectsPage = () => {
      const { history } = this.props
      goToProjectsPage(history)
   }

   updateTaskReaction = reaction(
      () => this.injectedProps.tasksStore.postTask.getApiStatus,
      apiStatus => {
         if (apiStatus === API_SUCCESS) {
            this.doNetWorkCall()
         }
      }
   )

   onChangePageNumberReaction = reaction(
      () => this.injectedProps.tasksStore.pageNavigation.currentPage,
      () => {
         this.doNetWorkCall()
      }
   )

   onCreateTaskReactionDeposer = reaction(
      () => this.injectedProps.tasksStore.taskTrasitionState.getApiStatus,
      apiStatus => {
         if (apiStatus === API_SUCCESS) {
            this.doNetWorkCall()
         }
      }
   )

   renderSuccessUI = observer(() => {
      const { tasksStore } = this.injectedProps
      const {
         currentPageEntities,
         totalNumberOfPages,
         currentPage,
         navigateToNextPage,
         navigateToPreviousPage,
         onClickPageNumber,
         getApiStatus,
         getApiError
      } = tasksStore.pageNavigation
      const { taskValidationField } = tasksStore
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

   render() {
      const { getUserDetailsApiError } = this.injectedProps.userDetailsStore
      return (
         <ProjectContainer>
            <LoadingWrapperWithFailure
               apiStatus={this.getApiStatus}
               apiError={getUserDetailsApiError}
               onRetryClick={this.doNetWorkCall}
               renderSuccessUI={this.renderSuccessUI}
            />
         </ProjectContainer>
      )
   }
}

export default withRouter(TasksRoute)
