import React,{Component} from "react"
import {  Modal } from 'semantic-ui-react'
import {observer} from "mobx-react"
import 'semantic-ui-css/semantic.min.css'

import {ValidateTaskTransitionView} from "./ValidateTaskTransitionView";

@observer
class  ValidateTask extends Component  {
    render(){
        const {handleClose,open} = this.props
      return<Modal
      open = {open}
      style = {{width:"auto"}} 
       >
        <Modal.Content >
            <ValidateTaskTransitionView {...this.props}/>
        </Modal.Content>
      </Modal>;
    }
}

export default ValidateTask