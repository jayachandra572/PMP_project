import React, { Fragment } from 'react'
import { observer } from 'mobx-react'
import { API_SUCCESS, API_INITIAL, API_FETCHING } from '@ib/api-constants'

import Colors from '../../themes/Colors'
import strings from '../../i18n/strings.json'

import { ToStatusLabel, ToStatusDropDown } from './styleComponent'

const ToStatusDropDownMenu = observer(props => {
   const { AddTransition } = strings
   const { transitionToStatus, onChangeTransitionToStatus } = props
   return (
      <Fragment>
         <ToStatusLabel
            isImportant={true}
            lableFor={AddTransition.toStatusLabel}
            content={AddTransition.toStatusLabel}
         />
         <ToStatusDropDown
            options={AddTransition.toStatusOptions}
            onChange={onChangeTransitionToStatus}
            placeholder={AddTransition.toStatusPlaceHolder}
            styles={{
               color: Colors.steel,
               width: '400px',
               border: `1px solid ${false ? 'red' : Colors.lightBlueGrey}`,
               height: '40px'
            }}
         />
      </Fragment>
   )
})

export { ToStatusDropDownMenu }
