import React, { Component, Fragment } from 'react'
import { observer } from 'mobx-react'
import LoadingWrapperWithFailure from '../../../Common/components/LoadingWrapperWithFailure'
import NoDataView from '../../../Common/components/NoDataView'
import { EachTask } from '../EachTask'
import { TaskTopics } from '../TaskTopics'
import { PageNavigation } from '../PageNavigation'
import { TasksHeader } from '../TasksHeader'

import { TasksContainer, TasksBox } from './styleComponent'
import { TasksProps } from '../ProjectTasks/ProjectTasks'

@observer
class Tasks extends Component<TasksProps> {
   renderTasks = () => {
      const { projectTasks, taskValidationField, doNetWorkCall } = this.props
      return projectTasks.map((task, index) => (
         <EachTask
            key={task.id}
            task={task}
            doNetWorkCall={doNetWorkCall}
            taskValidationField={taskValidationField}
            index={index}
         />
      ))
   }

   renderSuccessUI = observer(() => {
      const { projectTasks } = this.props
      if (projectTasks.length === 0) {
         return <NoDataView />
      } else {
         return (
            <TasksBox>
               <TaskTopics />
               {this.renderTasks()}
            </TasksBox>
         )
      }
   })
   render() {
      const {
         apiStatus,
         apiError,
         doNetWorkCall,
         activePageNumber,
         totalNumberOfPages,
         navigateToNextPage,
         navigateToPreviousPage,
         onClickPageNumber
      } = this.props
      return (
         <TasksContainer>
            <TasksHeader apiStatus={apiStatus} doNetWorkCall={doNetWorkCall} />
            <LoadingWrapperWithFailure
               apiError={apiError}
               apiStatus={apiStatus}
               onRetryClick={doNetWorkCall}
               renderSuccessUI={this.renderSuccessUI}
            />
            <PageNavigation
               activePageNumber={activePageNumber}
               totalNumberOfPages={totalNumberOfPages}
               navigateToNextPage={navigateToNextPage}
               navigateToPreviousPage={navigateToPreviousPage}
               onClickPageNumber={onClickPageNumber}
               apiStatus={apiStatus}
            />
         </TasksContainer>
      )
   }
}

export { Tasks }