import React, { Component } from 'react'
import { Button, Modal } from 'semantic-ui-react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import { API_SUCCESS, APIStatus } from '@ib/api-constants'
import 'semantic-ui-css/semantic.min.css'

import strings from '../../i18n/strings.json'
import Colors from '../../themes/Colors'

import { AddProject } from '../AddProject'

interface AddProjectModalProps {
   doNetWorkCall:()=>void
   apiStatus:APIStatus
}
@observer
class AddProjectModal extends Component <AddProjectModalProps>{
   @observable modalOpen = false
   handleOpen = () => {this.modalOpen = true}
   handleClose = () => {this.modalOpen = false}
   render() {
      const { doNetWorkCall, apiStatus } = this.props
      const disabled = apiStatus !== API_SUCCESS
      return (
         <Modal
            open={this.modalOpen}
            style={{ width: 'auto', padding: '20px' }}
            trigger={
               <Button
                  disabled={disabled}
                  onClick={this.handleOpen}
                  style={{
                     backgroundColor: `${Colors.brightBlue}`,
                     color: `${Colors.white}`
                  }}
               >
                  {strings.createButtonContent}
               </Button>
            }
         >
            <Modal.Content>
               <AddProject
                  doNetWorkCall={doNetWorkCall}
                  handleClose={this.handleClose}
               />
            </Modal.Content>
         </Modal>
      )
   }
}

export default AddProjectModal
