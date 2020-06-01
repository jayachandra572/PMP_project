import React,{Component} from "react"
import { Button, Modal } from 'semantic-ui-react'
import {observer} from "mobx-react"
import 'semantic-ui-css/semantic.min.css'

import strings from "../../i18n/strings";
import Colors from "../../themes/Colors";

import {AddProject} from "../AddProject";

@observer
class  ValidateTask extends Component  {
    render(){
        const {handleClose,open} = this.props
      return<Modal
      open = {open}
      style = {{width:"auto",padding:"20px"}} 
       >
        <Modal.Content >
          <AddProject handleClose={handleClose}/>
        </Modal.Content>
      </Modal>;
    }
}

export default ValidateTask