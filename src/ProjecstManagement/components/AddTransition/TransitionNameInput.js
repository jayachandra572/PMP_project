import React, { Component, Fragment } from 'react'
import { observer, inject } from 'mobx-react'
import { API_SUCCESS, API_INITIAL, API_FETCHING } from '@ib/api-constants'

import strings from '../../i18n/strings.json'

import { TrasitionName, TrasitionNameLabel } from './styleComponent'
const TransitionNameInput = observer(props => {
   const { AddTransition } = strings
   const { transitionName, onChangeTransitionName } = props
   return (
      <Fragment>
         <TrasitionNameLabel
            isImportant={true}
            lableFor={AddTransition.nameLabel}
            content={AddTransition.nameLabel}
         />
         <TrasitionName
            isEmpty={false}
            id={AddTransition.nameLabel}
            value={transitionName}
            onChange={onChangeTransitionName}
         />
      </Fragment>
   )
})

export { TransitionNameInput }
