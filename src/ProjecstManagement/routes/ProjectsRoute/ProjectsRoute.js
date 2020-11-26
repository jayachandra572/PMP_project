import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { computed, reaction, toJS } from 'mobx'
import { API_SUCCESS } from '@ib/api-constants'
import { getLoadingStatus } from '@ib/api-utils'
import LoadingWrapperWithFailure from '../../../Common/components/LoadingWrapperWithFailure'
import { goToSpecificProjectTasksScreen } from '../../utils/navigationUtils'
import ProjectsView from '../../components/Projects'
import withPmpHeader from '../../hoc/withPmpHeader'

@inject('projectsStore', 'userDetailsStore')
@observer
class ProjectsRoute extends Component {
   componentDidMount() {
      this.doNetWorkCall()
   }

   componentWillUnmount() {
      this.onChangePageNumberReaction()
   }

   onClickProject = projectId => {
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
      pageNumber => {
         this.doNetWorkCall()
      }
   )

   @computed get getApiStatus() {
      const { getUserDetailsApiStatus } = this.props.userDetailsStore
      const { getApiStatus } = this.props.projectsStore.pageNavigation
      if (getUserDetailsApiStatus === API_SUCCESS) {
         return getUserDetailsApiStatus
      } else {
         return getLoadingStatus(getUserDetailsApiStatus, getApiStatus)
      }
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
      } = this.props.projectsStore.pageNavigation
      return (
         <ProjectsView
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
         // <LoadingWrapperWithFailure
         //    apiStatus={this.getApiStatus}
         //    apiError={getUserDetailsApiError}
         //    onRetryClick={this.doNetWorkCall}
         //    renderSuccessUI={this.renderSuccessUI}
         // />

         <video
            src='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4'
            id='video-page-0-1'
            width='300'
            style={{ margin: '20px' }}
            controls
         />
          <iframe
               width='480'
               height='480'
               style={{ margin: '20px' }}
               src='https://www.youtube.com/embed/gCEowvFXlaE'
               frameborder='0'
               allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
               allowfullscreen
               id='video-page-2-3'
            ></iframe>
      )
   }
}
// window.onbeforeunload = function() {
//    return 'Dude, are you sure you want to refresh? Think of the kittens!'
// }

export default withRouter(withPmpHeader(ProjectsRoute))
