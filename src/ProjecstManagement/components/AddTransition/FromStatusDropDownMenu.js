import React, { Component, Fragment } from 'react'
import { observer, inject } from 'mobx-react'
import { observable, action } from 'mobx'
import { API_SUCCESS, API_INITIAL, API_FETCHING } from '@ib/api-constants'

import Colors from '../../themes/Colors'
import strings from '../../i18n/strings.json'
import { FromStatusLable, FromStatusDropDown } from './styleComponent'

const FromStatusDropDownMenu = observer(props => {
   const { AddTransition } = strings
   const { transitionFromStatus, onChangeTransitionFromStatus } = props
   return (
      <Fragment>
         <FromStatusLable
            isImportant={true}
            lableFor={AddTransition.fromStatusLabel}
            content={AddTransition.fromStatusLabel}
         />
         <FromStatusDropDown
            options={AddTransition.fromStatusOptions}
            onChange={onChangeTransitionFromStatus}
            placeholder={AddTransition.fromStatusPlaceHolder}
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
export { FromStatusDropDownMenu }
