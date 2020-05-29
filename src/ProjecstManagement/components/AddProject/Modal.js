import React from "react"
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
import {observer} from "mobx-react"
import 'semantic-ui-css/semantic.min.css'

import {AddProject} from "."
const ModalExampleCloseIcon = observer((props) => {
  const {open,close} = props;
  console.log("open",open)
  return<Modal open={open} closeIcon>
    <Header  content='Project' />
    <Modal.Content>
      <AddProject close = {close}/>
    </Modal.Content>
    <Modal.Actions>
    </Modal.Actions>
  </Modal>
})

export default ModalExampleCloseIcon