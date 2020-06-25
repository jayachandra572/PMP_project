import React, { Component } from 'react'
import { Modal } from 'semantic-ui-react'
import { observer } from 'mobx-react'
import 'semantic-ui-css/semantic.min.css'

import { ValidateTaskTransitionView } from './ValidateTaskTransitionView'
import ApiCallModel from "../../stores/models/ApiCallModel"


export interface ValidateTaskTransitionViewProps {
   taskTrasitionState:ApiCallModel
   getValidateFields:(state:string) => void
   taskValidationField:ApiCallModel
   title:string
   handleClose : () => void
   toStatus : string
   taskId : string
   fromStatus : string
}

export interface ValidateTaskProps extends ValidateTaskTransitionViewProps {
   open:boolean
}


@observer
class ValidateTask extends Component<ValidateTaskProps> {
   render() {
      const {  open,...props } = this.props
      return (
         <Modal open={open} style={{ width: 'auto' }}>
            <Modal.Content>
               <ValidateTaskTransitionView {...props} />
            </Modal.Content>
         </Modal>
      )
   }
}

export default ValidateTask
