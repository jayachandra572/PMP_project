import React, { Component } from 'react'
import { Modal } from 'semantic-ui-react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import { BsInfoCircle } from 'react-icons/bs'
import 'semantic-ui-css/semantic.min.css'

import {
   TaskInfo,
   TaskDetailsContainer,
   CaptionValue,
   Caption,
   DetailsField,
   CloseIconButton
} from './styleComponent'
import TaskModel from "../../stores/models/TaskModel"

interface TaskInfoModalProps{
   taskDetails:TaskModel
}

@observer
class TaskInfoModal extends Component <TaskInfoModalProps>{
   @observable modalOpen = false
   handleOpen = () => {this.modalOpen = true}
   handleClose = () => {this.modalOpen = false}

   RenderTaskInfo = () => {
      const {
         taskDetails: { title, description, createdAt, state }
      } = this.props
      return (
         <TaskDetailsContainer>
            <CloseIconButton onClick={this.handleClose} />
            <DetailsField>
               <Caption>Title :</Caption>
               <CaptionValue>{title}</CaptionValue>
            </DetailsField>
            <DetailsField>
               <Caption>CreatedAt :</Caption>
               <CaptionValue>{createdAt}</CaptionValue>
            </DetailsField>
            <DetailsField>
               <Caption>State :</Caption>
               <CaptionValue>{state}</CaptionValue>
            </DetailsField>
            <DetailsField>
               <Caption>Description :</Caption>
               <CaptionValue>{description}</CaptionValue>
            </DetailsField>
         </TaskDetailsContainer>
      )
   }
   render() {
      return (
         <Modal
            open={this.modalOpen}
            style={{ width: 'auto', padding: '20px' }}
            trigger={
               <TaskInfo onClick={this.handleOpen}>
                  <BsInfoCircle size={24} />
               </TaskInfo>
            }
         >
            <Modal.Content>{this.RenderTaskInfo()}</Modal.Content>
         </Modal>
      )
   }
}

export default TaskInfoModal
