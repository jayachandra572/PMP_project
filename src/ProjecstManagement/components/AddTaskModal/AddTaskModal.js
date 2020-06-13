import React, { Component } from 'react'
import { Button, Modal } from 'semantic-ui-react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import { API_SUCCESS } from '@ib/api-constants'
import 'semantic-ui-css/semantic.min.css'

import strings from '../../i18n/strings'
import Colors from '../../themes/Colors'
import { AddTask } from '../AddTask'

@observer
class AddTaskModal extends Component {
   @observable modalOpen = false
   handleOpen = () => (this.modalOpen = true)
   handleClose = () => (this.modalOpen = false)
   render() {
      const { apiStatus } = this.props
      const disabled = apiStatus !== API_SUCCESS
      return (
         <Modal
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
                  {strings.tasks.createTaskButtonContent}
               </Button>
            }
            open={this.modalOpen}
            onClose={this.handleClose}
         >
            <Modal.Content>
               <AddTask handleClose={this.handleClose} />
            </Modal.Content>
         </Modal>
      )
   }
}

export { AddTaskModal }
