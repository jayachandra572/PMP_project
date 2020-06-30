import React, { Component, Fragment } from 'react'
import { observer, inject } from 'mobx-react'
import { observable, reaction, action } from 'mobx'
import {
   API_SUCCESS,
   API_FETCHING,
   API_FAILED
} from '@ib/api-constants'

import { getUserDisplayableErrorMessage } from '../../../Common/utils/APIUtils'
import CloseButtonWithIcon from '../../../Common/components/CloseButtonWithIcon'

import toaster from '../../utils/Toaster'
import Colors from '../../themes/Colors'
import strings from '../../i18n/strings.json'
import NewProjectStore from "../../stores/NewProjectStore"


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
   Required
} from './styleComponent'

interface AddProjectProps {
   doNetWorkCall : () => void
   handleClose : () =>void
}
interface InjectedProps extends AddProjectProps {
   newProjectStore:NewProjectStore
}
interface ErrorMessage {
   projectNameEmpty:boolean
   projectWorkFlowError:boolean
   projectTypeError:boolean
   projectDescriptionError:boolean

}

type InputElementType = React.FormEvent<HTMLInputElement>

@inject('newProjectStore')
@observer
class AddProject extends Component<AddProjectProps> {
   @observable projectName !: string
   @observable workFlowTypeId !:string
   @observable projectType !:string
   @observable projectDescription !:string
   @observable errorMessage !:ErrorMessage

   constructor(props) {
      super(props)
      this.init()
   }
   
   getInjectedProps = () => this.props as InjectedProps

   componentDidMount() {
      const { workFlowType } = this.getInjectedProps().newProjectStore
      workFlowType.apiCall({})
   }
   componentWillUnmount() {
      this.createProjectReaction()
   }

   @action.bound
   init() {
      this.projectName = ''
      this.projectDescription = ''
      this.errorMessage = {
         projectNameEmpty:false,
         projectWorkFlowError:false,
         projectTypeError:false,
         projectDescriptionError:false
      }
      this.workFlowTypeId = ''
      this. projectType = ""
   }

   @action.bound
   onChangeProjectName(event:InputElementType) {
      this.projectName = event.currentTarget.value
      this.checkProjectNameError()
   }

   @action.bound
   onChangeWorkflowType(value:string) {
      this.workFlowTypeId = value
      this.checkWorkFlowTypeIdError()
   }
  

   @action.bound
   onChangeProjectType(value:string) {
      this.projectType = value
      this.checkProjectTypeError()
   }

   @action.bound
   onChangeDescription(event:InputElementType) {
      this.projectDescription = event.currentTarget.value
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
      const { newProject } = this.getInjectedProps().newProjectStore
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

   renderRequiredMessage(shouldRender:boolean) {
      if (shouldRender) {
         return <Required>{strings.required}</Required>
      }else{
        return null
      }
   }

   createProjectReaction = reaction(
      () => this.getInjectedProps().newProjectStore.newProject.getApiStatus,
      apiStatus => {
         if (apiStatus === API_SUCCESS) {
            this.props.handleClose()
            toaster('success', 'Successfully created project')
            this.props.doNetWorkCall()
         } else if (apiStatus === API_FAILED) {
            const {
               newProject: { getApiError }
            } = this.getInjectedProps().newProjectStore
            toaster('error', getApiError)
         }
      }
   )

   ProjectNameInput = observer(() => {
      const { onChangeProjectName, projectName, renderRequiredMessage } = this
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
            {renderRequiredMessage(projectNameEmpty)}
         </Fragment>
      )
   })

   ProjectTypeMenu = observer(() => {
      const { onChangeProjectType, renderRequiredMessage } = this
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
            {renderRequiredMessage(projectTypeError)}
         </Fragment>
      )
   })

   WorkFlowTypeMenu = observer(() => {
      const {
         workFlowType: { response, getApiStatus, getApiError }
      } = this.getInjectedProps().newProjectStore
      const { addProject } = strings
      const {
         errorMessage: { projectWorkFlowError },
         onChangeWorkflowType,
         renderRequiredMessage
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
               styles={{}}
            />
            {renderRequiredMessage(projectWorkFlowError)}
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
      const {
         projectDescription,
         onChangeDescription,
         renderRequiredMessage
      } = this
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
            {renderRequiredMessage(projectDescriptionError)}
         </Fragment>
      )
   })
   render() {
      const { newProject } = this.getInjectedProps().newProjectStore
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
            <CloseButtonWithIcon onClick={this.props.handleClose} />
            <ProjectNameInput />
            <ProjectTypeMenu />
            <WorkFlowTypeMenu />
            <DescriptionTextInput />
            <SubmitButton
               content={strings.submitButton}
               apiStatus={newProject.getApiStatus}
               onClick={submitDetailsOfProject}
            />
         </AddProjectContainer>
      )
   }
}

export { AddProject }
