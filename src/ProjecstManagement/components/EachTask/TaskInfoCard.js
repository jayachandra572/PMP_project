import React,{Component} from "react"
import { Button, Modal } from 'semantic-ui-react'
import {observer} from "mobx-react"
import {observable} from "mobx"
import 'semantic-ui-css/semantic.min.css'

import strings from "../../i18n/strings";
import Colors from "../../themes/Colors";
import {TaskInfo} from "./styleComponent";

@observer
class  TaskInfoModal extends Component  {
    @observable modalOpen = false
    handleOpen = () => this.modalOpen= true 
    handleClose = () => this.modalOpen = false 
    
    
    render(){
      return<Modal
      style = {{width:"auto",padding:"20px"}} 
       trigger={<TaskInfo onClick = {this.handleOpen}
       >info</TaskInfo>}
       >
        <Modal.Content >
          hi
        </Modal.Content>
      </Modal>;
    }
}

export default TaskInfoModal