import React,{Component} from "react"
import { Button, Modal } from 'semantic-ui-react'
import {observer} from "mobx-react"
import {observable} from "mobx"
import 'semantic-ui-css/semantic.min.css'

@observer
class  AddProjectModal extends Component  {
    @observable modalOpen = false
    handleOpen = () => this.modalOpen= true 
    handleClose = () => this.modalOpen = false 
    render(){
        console.log(this.props.children[0])
      return<Modal
      open = {this.modalOpen}
      style = {{width:"auto",padding:"20px"}} 
       trigger={<Button onClick = {this.handleOpen} 
       >jaya</Button>}
       >
        <Modal.Content >
          hi
        </Modal.Content>
      </Modal>;
    }
}



export default AddProjectModal