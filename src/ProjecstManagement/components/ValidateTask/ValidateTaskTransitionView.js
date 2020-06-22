import React, { Component, Fragment } from 'react'
import { observer } from 'mobx-react'
import { reaction } from 'mobx'
import { API_SUCCESS, API_FETCHING, API_FAILED } from '@ib/api-constants'
import { RiCloseLine } from 'react-icons/ri'

import CheckboxWithLabel from '../../../Common/components/CheckboxWithLabel'
import CloseButtonWithIcon from "../../../Common/components/CloseButtonWithIcon"

import { Header, Required } from '../../styleComponent/FormStyles'
import Toaster from '../../utils/Toaster'

import FailureView from './FailureView'
import LoadingView from './LoadingView'
import {
   FromAndToStatus,
   FromStatus,
   ToStatus,
   TaskTransitionValidateContainer,
   CheckBoxContainer,
   SubmitButton,
   From,
   To,
   Status,
   VadationFields
} from './styleComponent'

@observer
class ValidateTaskTransitionView extends Component {
   componentDidMount() {
      this.props.getValidateFields(this.props.toStatus)
   }
   componentWillUnmount() {
      this.onSubmitSuccessReaction()
   }
   onSubmit = () => {
      const {
         taskValidationField: { response },
         taskTrasitionState,
         toStatus,
         fromStatus,
         taskId
      } = this.props
      const validateArrayIds = response
         .filter(field => field.value)
         .map(field => field.id)
      taskTrasitionState.apiCall({
         taskId,
         validateArrayIds,
         fromStatus,
         toStatus
      })
   }

   onSubmitSuccessReaction = reaction(
      () => this.props.taskTrasitionState.getApiStatus,
      apiStatus => {
         if (apiStatus === API_SUCCESS) {
            this.props.handleClose()
         } else if (apiStatus === API_FAILED) {
            const {
               taskTrasitionState: { getApiError }
            } = this.props
            Toaster('error', getApiError)
         }
      }
   )

   RenderValidationConditions = observer(() => {
      const { response } = this.props.taskValidationField
      return response.map(eachCondition => (
         <CheckBoxContainer key={eachCondition.id}>
            <CheckboxWithLabel
               key={eachCondition.id}
               id={eachCondition.id}
               label={eachCondition.label}
               value={eachCondition.value}
               onClick={eachCondition.onClick}
            />
         </CheckBoxContainer>
      ))
   })

   renderSuccessUI = () => {
      const { RenderValidationConditions, onSubmit } = this
      const {
         taskTrasitionState: { getApiStatus }
      } = this.props
      return (
         <Fragment>
            <VadationFields>
               <RenderValidationConditions />
            </VadationFields>
            <SubmitButton
               apiStatus={getApiStatus}
               content={'SUBMIT'}
               onClick={onSubmit}
            />
         </Fragment>
      )
   }

   LoadingWrapperWithFailure = observer(() => {
      const { getValidateFields } = this.props
      const { getApiStatus, getApiError } = this.props.taskValidationField
      switch (getApiStatus) {
         case API_FAILED:
            return <FailureView onRetryClick={getValidateFields} />
         case API_FETCHING:
            return <LoadingView />
         case API_SUCCESS:
            return this.renderSuccessUI()
         default:
            return null
      }
   })

   render() {
      const {
         LoadingWrapperWithFailure,
         props: { toStatus, fromStatus, title }
      } = this
      return (
         <TaskTransitionValidateContainer>
            <CloseButtonWithIcon onClick={this.props.handleClose}/>
            <Header>{title.toUpperCase()}</Header>
            <FromAndToStatus>
               <FromStatus>
                  <From>Form :</From>
                  <Status>{fromStatus}</Status>
               </FromStatus>
               <ToStatus>
                  <To>To : </To>
                  <Status>{toStatus}</Status>
               </ToStatus>
            </FromAndToStatus>
            <LoadingWrapperWithFailure />
         </TaskTransitionValidateContainer>
      )
   }
}

export { ValidateTaskTransitionView }
