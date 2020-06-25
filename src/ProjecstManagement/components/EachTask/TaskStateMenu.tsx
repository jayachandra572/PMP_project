import React from 'react'
import { observable, reaction, action } from 'mobx'
import { observer } from 'mobx-react'
import {
   API_SUCCESS,
   API_FETCHING,
   API_FAILED,
   APIStatus
} from '@ib/api-constants'

import toaster from '../../utils/Toaster'
import Colors from '../../themes/Colors'
import { DropdownWithLoader } from '../DropdownWithLoader'
import ValidateTask from '../ValidateTask'
import { State } from './styleComponent'
import ApiCallModel from "../../stores/models/ApiCallModel"
import { StatusObject } from "../../stores/type"

interface TaskStateMenuProps{
   taskValidationField : ApiCallModel
   onClickStateMenu:()=> void
   options:Array<StatusObject>
   getApiStatus:APIStatus
   getApiError:Error|null
   getValidateFields:(state:string) => void
   title:string
   fromStatus:string
   taskId:string
   taskTrasitionState:ApiCallModel
}

@observer
class TaskStateMenu extends React.Component <TaskStateMenuProps>{
   @observable isDropdownMenuOpen = false
   @observable modalOpen = false
   @observable toStatus = ""

   handleOpen = () => {this.modalOpen = true}
   handleClose = () => {this.modalOpen = false}

   openDropdownMenu = () => {this.isDropdownMenuOpen = true}

   closeDropdownMenu = () => {this.isDropdownMenuOpen = false}

   @action.bound
   onChangeStateValue(value:string) {
      this.toStatus = value
      this.handleOpen()
   }

   isApiStatusSuccess (status:APIStatus):boolean{
      return status === API_SUCCESS
   }

   isApiStatusFailed (status:APIStatus):boolean{
      return status === API_FAILED
   }

   openDropdownReaction = reaction(
      () => this.props.getApiStatus,
      apiStatus => {
         if (this.isApiStatusFailed(apiStatus) ) {
            if (this.props.options.length === 1) {
               toaster('info', 'There is no next task transitions')
            } else {
               this.openDropdownMenu()
            }
         } else if (this.isApiStatusFailed(apiStatus)) {
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
               styles={{minWidth: '90px',
               maxWidth: '130px',
               border: 'none',
               backgroundColor: 'transparent',
               color: `${Colors.steel}`}}
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
