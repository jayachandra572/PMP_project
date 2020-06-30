import React, { Component, Fragment } from 'react'
import { observer, inject } from 'mobx-react'
import { observable, reaction, action } from 'mobx'
import { RiCloseLine } from 'react-icons/ri'
import { API_SUCCESS, API_FAILED } from '@ib/api-constants'

import CloseButtonWithIcon from '../../../Common/components/CloseButtonWithIcon'

import toaster from '../../utils/Toaster'
import Colors from '../../themes/Colors'
import strings from '../../i18n/strings.json'
import TasksStore from "../../stores/TasksStore"


import {
   AddTaskContainer,
   Header,
   TaskTitle,
   TaskTitleLabel,
   IssueTypeLabel,
   IssueTypeMenu,
   DescriptionLabel,
   DescriptionTextArea,
   SubmitButton,
   Required
} from './styleComponent'

interface AddTaskProps {
   doNetWorkCall : () => void
   handleClose : () =>void
}
interface InjectedProps extends AddTaskProps {
   tasksStore:TasksStore
}

interface ErrorMessage{
   taskTitleEmpty:boolean,
   issueTypeError:boolean,
   descriptionError:boolean
}

type InputElementType = React.FormEvent<HTMLInputElement>

@inject('tasksStore')
@observer
class AddTask extends Component<AddTaskProps>{
   @observable taskTitle !: string
   @observable issueType !: null | string
   @observable description !: string
   @observable errorMessage !: ErrorMessage

   constructor(props) {
      super(props)
      this.init()
   }

   componentWillUnmount() {
      this.reaction1()
   }

   @action.bound
   init() {
      this.taskTitle = ''
      this.description = ''
      this.issueType = null
      this.errorMessage = {
         taskTitleEmpty:false,
         issueTypeError:false,
         descriptionError:false
      }
   }

   getInjectedProps = () => this.props as InjectedProps

   @action.bound
   onChangeTaskTitle(event:InputElementType) {
      this.taskTitle = event.currentTarget.value
      this.checkTaskTitle()
   }

   @action.bound
   onChangeIssueType(value:string) {
      this.issueType = value
      this.checkIssueType()
   }

   @action.bound
   onChangeDescription(event:InputElementType) {
      this.description = event.currentTarget.value
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

   renderRequiredMessage(shouldRender:boolean) {
      if (shouldRender) {
         return <Required>{strings.required}</Required>
      }else{
        return null
      }
   }

   @action.bound
   submitTask() {
      const { postTask, projectId } = this.getInjectedProps().tasksStore
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
         postTask.apiCall({ projectId, taskTitle, issueType, description })
      }
   }

   reaction1 = reaction(
      () => this.getInjectedProps().tasksStore.postTask.getApiStatus,
      apiStatus => {
         if (apiStatus === API_SUCCESS) {
            toaster('success', 'successfully created task')
            this.props.handleClose()
            this.init()
         } else if (apiStatus === API_FAILED) {
            const { getApiError } = this.getInjectedProps().tasksStore.postTask
            toaster('error', getApiError)
         }
      }
   )

   TaskTitleInput = observer(() => {
      const { tasks } = strings
      const {
         taskTitle,
         onChangeTaskTitle,
         errorMessage: { taskTitleEmpty },
         renderRequiredMessage
      } = this

      return (
         <Fragment>
            <TaskTitleLabel
               isImportant={true}
               lableFor={tasks.taskTitleLable}
               content={tasks.taskTitleLable}
            />
            <TaskTitle
               isEmpty={taskTitleEmpty}
               id={tasks.taskTitleLable}
               value={taskTitle}
               onChange={onChangeTaskTitle}
            />
            {renderRequiredMessage(taskTitleEmpty)}
         </Fragment>
      )
   })

   IssueTypeMenu = observer(() => {
      const { tasks } = strings
      const {
         issueType,
         onChangeIssueType,
         errorMessage: { issueTypeError },
         renderRequiredMessage
      } = this
      return (
         <Fragment>
            <IssueTypeLabel
               isImportant={true}
               lableFor={tasks.issueTypeLabel}
               content={tasks.issueTypeLabel}
            />
            <IssueTypeMenu
               id={tasks.issueTypeLabel}
               value={issueType}
               options={tasks.issueTypes}
               onChange={onChangeIssueType}
               placeholder={tasks.issueTypePlaceHolder}
               styles={{
                  color: Colors.steel,
                  width: '400px',
                  border: `1px solid ${
                     issueTypeError ? Colors.red : Colors.lightBlueGrey
                  }`,
                  height: '40px'
               }}
            />
            {renderRequiredMessage(issueTypeError)}
         </Fragment>
      )
   })

   DescriptionTextInput = observer(() => {
      const {
         description,
         onChangeDescription,
         errorMessage: { descriptionError },
         renderRequiredMessage
      } = this
      const { tasks } = strings
      return (
         <Fragment>
            <DescriptionLabel
               isImportant={true}
               lableFor={tasks.descriptionLabel}
               content={tasks.descriptionLabel}
            />
            <DescriptionTextArea
               id={tasks.descriptionLabel}
               isError={descriptionError}
               value={description}
               onChange={onChangeDescription}
            />
            {renderRequiredMessage(descriptionError)}
         </Fragment>
      )
   })

   render() {
      const {
         postTask: { getApiStatus }
      } = this.getInjectedProps().tasksStore
      const { TaskTitleInput, IssueTypeMenu, DescriptionTextInput } = this
      return (
         <AddTaskContainer>
            <Header>TASK</Header>
            <CloseButtonWithIcon onClick={this.props.handleClose} />
            <TaskTitleInput />
            <IssueTypeMenu />
            <DescriptionTextInput />
            <SubmitButton
               content={strings.submitButton}
               apiStatus={getApiStatus}
               onClick={this.submitTask}
            />
         </AddTaskContainer>
      )
   }
}

export { AddTask }
