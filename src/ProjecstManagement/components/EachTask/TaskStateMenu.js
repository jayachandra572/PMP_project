import React from 'react'
import { observable, reaction, action } from 'mobx'
import { observer } from 'mobx-react'
import {
   API_SUCCESS,
   API_INITIAL,
   API_FETCHING,
   API_FAILED
} from '@ib/api-constants'

import toaster from '../../utils/Toaster'
import strings from '../../i18n/strings.json'
import Colors from '../../themes/Colors'
import { DropdownWithLoader } from '../DropdownWithLoader'
import ValidateTask from '../ValidateTask'
import { State, dropDownCss } from './styleComponent'

@observer
class TaskStateMenu extends React.Component {
   @observable isDropdownMenuOpen = false
   @observable modalOpen = false
   @observable toStatus = null

   handleOpen = () => (this.modalOpen = true)
   handleClose = () => (this.modalOpen = false)

   openDropdownMenu = () => (this.isDropdownMenuOpen = true)

   closeDropdownMenu = () => (this.isDropdownMenuOpen = false)

   @action.bound
   onChangeStateValue(event, data) {
      this.toStatus = data.value
      this.handleOpen()
   }

   openDropdownReaction = reaction(
      () => this.props.getApiStatus,
      apiStatus => {
         if (apiStatus === API_SUCCESS) {
            if (this.props.options.length === 1) {
               toaster('info', 'There is no next task transitions')
            } else {
               this.openDropdownMenu()
            }
         } else if (apiStatus === API_FAILED) {
            const { getApiError } = this.props
            toaster('error', getApiError)
         }
      }
   )

   render() {
      const {
         options,
         getApiStatus,
         onClickStateMenu,
         taskValidationField,
         getValidateFields,
         title,
         fromStatus,
         taskTrasitionState,
         taskId
      } = this.props
      const { onChangeStateValue, modalOpen, handleClose, toStatus } = this
      return (
         <State>
            <DropdownWithLoader
               options={options}
               value={fromStatus}
               onChange={onChangeStateValue}
               onClick={onClickStateMenu}
               loading={getApiStatus === API_FETCHING}
               open={this.isDropdownMenuOpen}
               closeDropdownMenu={this.closeDropdownMenu}
               styles={dropDownCss}
            />
            <ValidateTask
               taskTrasitionState={taskTrasitionState}
               getValidateFields={getValidateFields}
               taskValidationField={taskValidationField}
               open={modalOpen}
               title={title}
               handleClose={handleClose}
               toStatus={toStatus}
               taskId={taskId}
               fromStatus={fromStatus}
            />
         </State>
      )
   }
}

export { TaskStateMenu }
