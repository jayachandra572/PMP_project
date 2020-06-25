import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter,RouteComponentProps } from 'react-router-dom'
import { computed, reaction, toJS } from 'mobx'
import { API_SUCCESS } from '@ib/api-constants'
import { getLoadingStatus } from '@ib/api-utils'

import LoadingWrapperWithFailure from '../../../Common/components/LoadingWrapperWithFailure'
import UserDetailsStore from "../../../Authentication/stores/UserDetailsStore"

import { goToSpecificProjectTasksScreen } from '../../utils/navigationUtils'
import Projects from '../../components/Projects'
import ProjectsStore from "../../stores/ProjectsStore"


import {
   ProjectContainer
} from './stylesComponent'

interface MatchParams {
   id:string
}

interface ProjectsRouteProps extends  RouteComponentProps<MatchParams>{
}

interface InjectedProps extends ProjectsRouteProps {
   projectsStore:ProjectsStore
   userDetailsStore:UserDetailsStore
}

@inject('projectsStore', 'userDetailsStore')
@observer
class ProjectsRoute extends Component<ProjectsRouteProps>{
   componentDidMount() {
      this.doNetWorkCall()
   }

   componentWillUnmount() {
      this.onChangePageNumberReaction()
   }

   getInjectedProps = () => this.props as InjectedProps

   @computed get getApiStatus():number {
      const {userDetailsStore,projectsStore} = this.getInjectedProps() 
      const { getUserDetailsApiStatus } = userDetailsStore
      const {pageNavigation:{ getApiStatus }} = projectsStore
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
      const {userDetailsStore,projectsStore} = this.getInjectedProps() 
      const {
         getEntriesFromApi,
         pageLimit,
         offset
      } = projectsStore.pageNavigation
      const {
         getUserDetailsApiStatus,
         getUserDetailsApi
      } = userDetailsStore
      if (getUserDetailsApiStatus !== API_SUCCESS) {
         getUserDetailsApi()
      }
      getEntriesFromApi({ limit: pageLimit, offset })
   }

   onChangePageNumberReaction = reaction(
      () => this.getInjectedProps().projectsStore.pageNavigation.currentPage,
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
      } = this.getInjectedProps().projectsStore.pageNavigation
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
      const { getUserDetailsApiError } = this.getInjectedProps().userDetailsStore
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

export default withRouter((ProjectsRoute))
