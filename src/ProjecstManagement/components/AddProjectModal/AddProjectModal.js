import React,{Component} from "react"
import { Button, Modal } from 'semantic-ui-react'
import {observer} from "mobx-react"
import {observable} from "mobx"
import 'semantic-ui-css/semantic.min.css'

import strings from "../../i18n/strings";
import Colors from "../../themes/Colors";

import {AddProject} from "../AddProject";

@observer
class  AddProjectModal extends Component  {
    @observable modalOpen = false
    handleOpen = () => this.modalOpen= true 
    handleClose = () => this.modalOpen = false 
    render(){
    const {doNetWorkCall} = this.props;
      return<Modal
      open = {this.modalOpen}
      style = {{width:"auto",padding:"20px"}} 
       trigger={<Button onClick = {this.handleOpen} style = {{backgroundColor:`${Colors.brightBlue}`,color:`${Colors.white}`}}
       >{strings.createButtonContent}</Button>}
       >
        <Modal.Content >
          <AddProject doNetWorkCall={doNetWorkCall} handleClose={this.handleClose}/>
        </Modal.Content>
      </Modal>;
    }
}

export default AddProjectModal