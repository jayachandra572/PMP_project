import React, { Component, Fragment } from 'react'
import { observer, inject } from 'mobx-react'
import { observable, reaction, action } from 'mobx'
import { RiCloseLine } from 'react-icons/ri'
import {
   API_SUCCESS,
   API_INITIAL,
   API_FETCHING,
   API_FAILED
} from '@ib/api-constants'

import { getUserDisplayableErrorMessage } from '../../../Common/utils/APIUtils'
import toaster from '../../utils/Toaster'
import Colors from '../../themes/Colors'
import strings from '../../i18n/strings.json'

import {
   ProjectName,
   AddProjectContainer,
   WorkflowType,
   ProjectType,
   ProjectNameLabel,
   DescriptionLabel,
   WorkflowTypeLabel,
   ProjectTypeLabel,
   SubmitButton,
   DescriptionTextArea,
   Header,
   Required,
   CloseButton
} from './styleComponent'

@inject('newProjectStore')
@observer
class AddProject extends Component {
   @observable projectName
   @observable workFlowTypeId = ''
   @observable projectType = ''
   @observable projectDescription
   @observable errorMessage

   constructor(props) {
      super(props)
      this.init()
   }
   componentDidMount() {
      const { workFlowType } = this.props.newProjectStore
      workFlowType.apiCall({})
   }
   componentWillUnmount() {
      // this.reaction1.dispose();
   }

   @action.bound
   init() {
      this.projectName = ''
      this.projectDescription = ''
      this.errorMessage = {}
   }

   @action.bound
   onChangeProjectName(event) {
      this.projectName = event.target.value
      this.checkProjectNameError()
   }

   @action.bound
   onChangeWorkflowType(event, data) {
      this.workFlowTypeId = data.value
      this.checkWorkFlowTypeIdError()
   }

   @action.bound
   onChangeProjectType(event, data) {
      this.projectType = data.value
      this.checkProjectTypeError()
   }

   @action.bound
   onChangeDescription(event) {
      this.projectDescription = event.target.value
      this.checkProjectDescriptionError()
   }

   closeNewProjectPage = () => {
      this.props.handleClose()
   }

   checkProjectNameError = () => {
      this.errorMessage.projectNameEmpty = this.projectName === ''
   }
   checkWorkFlowTypeIdError() {
      this.errorMessage.projectWorkFlowError = this.workFlowTypeId === ''
   }
   checkProjectTypeError = () => {
      this.errorMessage.projectTypeError = this.projectType === ''
   }

   checkProjectDescriptionError = () => {
      this.errorMessage.projectDescriptionError = this.projectDescription === ''
   }

   anyErrorInPage = () => {
      const {
         projectNameEmpty,
         projectWorkFlowError,
         projectTypeError,
         projectDescriptionError
      } = this.errorMessage
      return (
         projectNameEmpty ||
         projectWorkFlowError ||
         projectTypeError ||
         projectDescriptionError
      )
   }

   @action.bound
   submitDetailsOfProject() {
      const { newProject } = this.props.newProjectStore
      const {
         projectName,
         workFlowTypeId,
         projectType,
         projectDescription
      } = this

      this.checkWorkFlowTypeIdError()
      this.checkProjectTypeError()
      this.checkProjectDescriptionError()
      this.checkProjectNameError()
      if (!this.anyErrorInPage()) {
         newProject.apiCall({
            projectName,
            workFlowTypeId,
            projectType,
            projectDescription
         })
      }
   }

   createProjectReaction = reaction(
      () => this.props.newProjectStore.newProject.getApiStatus,
      apiStatus => {
         if (apiStatus === API_SUCCESS) {
            this.props.handleClose()
            console.log(this.props.doNetWorkCall)
            this.props.doNetWorkCall()
         } else if (apiStatus === API_FAILED) {
            const {
               newProject: { getApiError }
            } = this.props.newProjectStore
            toaster('error', getApiError)
         }
      }
   )

   ProjectNameInput = observer(() => {
      const { onChangeProjectName, projectName } = this
      const { projectNameEmpty } = this.errorMessage
      const { addProject } = strings
      return (
         <Fragment>
            <ProjectNameLabel
               isImportant={true}
               lableFor={addProject.lableName}
               content={addProject.lableName}
            />
            <ProjectName
               isEmpty={projectNameEmpty}
               id={addProject.lableName}
               value={projectName}
               onChange={onChangeProjectName}
            />
            {projectNameEmpty && <Required>{strings.required}</Required>}
         </Fragment>
      )
   })

   ProjectTypeMenu = observer(() => {
      const { onChangeProjectType } = this
      const { projectTypeError } = this.errorMessage
      const { addProject } = strings
      return (
         <Fragment>
            <ProjectTypeLabel
               isImportant={true}
               lableFor={addProject.ProjectType}
               content={addProject.ProjectType}
            />
            <ProjectType
               data-testid={strings.data_testid.projectTypeMenu}
               options={addProject.projectTypes}
               onChange={onChangeProjectType}
               placeholder={`${addProject.projectTypePlaceHolder}`}
               styles={{
                  color: Colors.steel,
                  width: '400px',
                  border: `1px solid ${
                     projectTypeError ? 'red' : Colors.lightBlueGrey
                  }`,
                  height: '40px'
               }}
            />
            {projectTypeError && <Required>{strings.required}</Required>}
         </Fragment>
      )
   })

   WorkFlowTypeMenu = observer(() => {
      const {
         workFlowType: { response, getApiStatus, getApiError }
      } = this.props.newProjectStore
      const { addProject } = strings
      const {
         errorMessage: { projectWorkFlowError },
         onChangeWorkflowType
      } = this
      return (
         <Fragment>
            <WorkflowTypeLabel
               isImportant={true}
               lableFor={addProject.WorkflowType}
               content={addProject.WorkflowType}
            />
            <WorkflowType
               data-testid={strings.data_testid.workFlowTypeMenu}
               options={response}
               onChange={onChangeWorkflowType}
               placeholder={addProject.workflowTypePlaceHolder}
               loading={getApiStatus === API_FETCHING}
               error={getApiStatus === API_FAILED}
               styles={{
                  color: Colors.steel,
                  width: '400px',
                  border: `1px solid ${
                     projectWorkFlowError ? 'red' : Colors.lightBlueGrey
                  }`,
                  height: '40px'
               }}
            />
            {projectWorkFlowError && <Required>{strings.required}</Required>}
            {getApiStatus === API_FAILED && (
               <Required>
                  {getUserDisplayableErrorMessage(getApiError)}
               </Required>
            )}
         </Fragment>
      )
   })

   DescriptionTextInput = observer(() => {
      const { addProject } = strings
      const { projectDescriptionError } = this.errorMessage
      const { projectDescription, onChangeDescription } = this
      return (
         <Fragment>
            <DescriptionLabel
               isImportant={true}
               lableFor={addProject.lableDescription}
               content={addProject.lableDescription}
            />
            <DescriptionTextArea
               id={addProject.lableDescription}
               isError={projectDescriptionError}
               value={projectDescription}
               onChange={onChangeDescription}
            />
            {projectDescriptionError && <Required>{strings.required}</Required>}
         </Fragment>
      )
   })
   render() {
      const { newProject } = this.props.newProjectStore
      const {
         submitDetailsOfProject,
         ProjectNameInput,
         ProjectTypeMenu,
         WorkFlowTypeMenu,
         DescriptionTextInput
      } = this
      return (
         <AddProjectContainer>
            <Header>{strings.addProject.title}</Header>
            <CloseButton onClick={this.props.handleClose}>
               <RiCloseLine size={24} />
            </CloseButton>
            <ProjectNameInput />
            <ProjectTypeMenu />
            <WorkFlowTypeMenu />
            <DescriptionTextInput />
            <SubmitButton
               type='button'
               content={strings.submitButton}
               apiStatus={newProject.getApiStatus}
               onClick={submitDetailsOfProject}
            />
         </AddProjectContainer>
      )
   }
}

export { AddProject }
