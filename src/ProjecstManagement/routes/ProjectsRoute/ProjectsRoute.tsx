import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { computed, reaction, toJS } from 'mobx'
import { API_SUCCESS } from '@ib/api-constants'
import { getLoadingStatus } from '@ib/api-utils'
import {History} from "history"

import LoadingWrapperWithFailure from '../../../Common/components/LoadingWrapperWithFailure'
import UserDetailsStore from "../../../Authentication/stores/UserDetailsStore"

import { goToSpecificProjectTasksScreen } from '../../utils/navigationUtils'
import Projects from '../../components/Projects'
import ProjectsStore from "../../stores/ProjectsStore"

import {
   ProjectContainer
} from './stylesComponent'

interface propsType {
   projectsStore:ProjectsStore
   userDetailsStore:UserDetailsStore
   history:History
   match:{params:{id:string}}
}
@inject('projectsStore', 'userDetailsStore')
@observer
class ProjectsRoute extends Component<propsType>{
   componentDidMount() {
      this.doNetWorkCall()
   }

   componentWillUnmount() {
      this.onChangePageNumberReaction()
   }

   @computed get getApiStatus():number {
      const { getUserDetailsApiStatus } = this.props.userDetailsStore
      const { getApiStatus } = this.props.projectsStore.pageNavigation
      if (getUserDetailsApiStatus === API_SUCCESS) {
         return getUserDetailsApiStatus
      } else {
         return getLoadingStatus(getUserDetailsApiStatus, getApiStatus)
      }
   }

   onClickProject = (projectId:string)=> {
      const { history } = this.props
      goToSpecificProjectTasksScreen(history, projectId)
   }


   doNetWorkCall = () => {
      const {
         getEntriesFromApi,
         pageLimit,
         offset
      } = this.props.projectsStore.pageNavigation
      const {
         getUserDetailsApiStatus,
         getUserDetailsApi
      } = this.props.userDetailsStore
      if (getUserDetailsApiStatus !== API_SUCCESS) {
         getUserDetailsApi()
      }
      getEntriesFromApi({ limit: pageLimit, offset })
   }

   onChangePageNumberReaction = reaction(
      () => this.props.projectsStore.pageNavigation.currentPage,
      () => {
         this.doNetWorkCall()
      }
   )

  

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
      } = this.props.projectsStore.pageNavigation
      return (
         <Projects
         projectsPerPage={pageLimit}
         projects={currentPageEntities}
         activePageNumber={currentPage}
         totalNumberOfPages={totalNumberOfPages}
         navigateToNextPage={navigateToNextPage}
         navigateToPreviousPage={navigateToPreviousPage}
         onClickPageNumber={onClickPageNumber}
         apiError={getApiError}
         apiStatus={getApiStatus}
         doNetWorkCall={this.doNetWorkCall}
         onClickProject={this.onClickProject}
         />
      )
   })

   render() {
      const { getUserDetailsApiError } = this.props.userDetailsStore
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
window.onbeforeunload = function() {
   return 'Dude, are you sure you want to refresh? Think of the kittens!'
}

export default withRouter(ProjectsRoute)
