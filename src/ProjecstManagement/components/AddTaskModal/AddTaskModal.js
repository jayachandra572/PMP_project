import React,{Component} from "react"
import { Button, Modal } from 'semantic-ui-react'
import {observer} from "mobx-react"
import {observable} from "mobx"
import 'semantic-ui-css/semantic.min.css'

import strings from "../../i18n/strings";
import Colors from "../../themes/Colors";
import {AddTask} from "../AddTask"

@observer
class  AddTaskModal extends Component  {
    @observable modalOpen = false
    handleOpen = () => this.modalOpen= true 
    handleClose = () => this.modalOpen = false 
    render(){
      return<Modal style = {{width:"auto",padding:"20px"}} 
       trigger={<Button onClick = {this.handleOpen} style = {{backgroundColor:`${Colors.brightBlue}`,color:`${Colors.white}`}}
       >{strings.tasks.createTaskButtonContent}</Button>}
       open={this.modalOpen}
        onClose={this.handleClose}>
        <Modal.Content >
         <AddTask handleClose = {this.handleClose}/>
        </Modal.Content>
      </Modal>;
    }
}

export {AddTaskModal}