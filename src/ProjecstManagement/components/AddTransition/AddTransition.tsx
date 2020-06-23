import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { observable } from 'mobx'
import { API_SUCCESS, API_INITIAL, API_FETCHING } from '@ib/api-constants'


import strings from '../../i18n/strings.json'

import { TransitionNameInput } from './TransitionNameInput'
import { FromStatusDropDownMenu } from './FromStatusDropDownMenu'
import { DescriptionTextInput } from './DescriptionTextInput'
import { ToStatusDropDownMenu } from './ToStatusDropDownMenu'

import { TransitionContainer, AddTransitionButton } from './styleComponent'

@observer
class AddTransition extends Component {
   @observable transitionName
   @observable transitionToStatus
   @observable transitionFromStatus
   @observable tranistionDescription
   @observable errorMessages

   onChangeTransitionName = event => {
      this.transitionName = event.target.value
   }

   onChangeTransitionToStatus = (event, data) => {
      this.transitionToStatus = data.value
   }
   onChangeTransitionFromStatus = (event, data) => {
      this.transitionFromStatus = data.value
   }

   onChangeTransitionDescription = event => {
      this.tranistionDescription = event.target.value
   }

   validateTransitionName = () => {
      const { transitionName } = this
      this.errorMessages.name = transitionName === ''
   }

   validateTransitionToStatus = () => {
      const { transitionToStatus } = this
      this.errorMessages.toStatus = transitionToStatus === ''
   }

   render() {
      const {
         transitionName,
         onChangeTransitionName,
         transitionToStatus,
         onChangeTransitionToStatus,
         tranistionDescription,
         onChangeTransitionDescription,
         transitionFromStatus,
         onChangeTransitionFromStatus
      } = this
      const { AddTransition } = strings
      return (
         <TransitionContainer>
            <FromStatusDropDownMenu
               transitionFromStatus={transitionFromStatus}
               onChangeTransitionFromStatus={onChangeTransitionFromStatus}
            />
            <ToStatusDropDownMenu
               onChangeTransitionToStatus={onChangeTransitionToStatus}
               transitionToStatus={transitionToStatus}
            />
            <TransitionNameInput
               onChangeTransitionName={onChangeTransitionName}
               transitionName={transitionName}
            />
            <DescriptionTextInput
               tranistionDescription={tranistionDescription}
               onChangeTransitionDescription={onChangeTransitionDescription}
            />
            <AddTransitionButton content={AddTransition.addButton} />
         </TransitionContainer>
      )
   }
}

export { AddTransition }
