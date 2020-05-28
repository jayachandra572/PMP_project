import React from 'react'
import Loader from 'react-loader-spinner'
import { API_FETCHING } from '@ib/api-constants'

import {Typo14WhiteRubikMedium} from "../../../styleGuide/Typos"
import { ButtonStyleComponent } from './stylesComponent'

function Button(props) {
   let { content, onClick, apiStatus, className } = props
   const disabled = apiStatus === API_FETCHING ? 'disabled' : ''
   content =
      apiStatus === API_FETCHING ? (
         <Loader
            type='TailSpin'
            color='black'
            text-align='center'
            height={20}
         />
      ) : (
         content
      )
   return (
      <ButtonStyleComponent className={className} onClick={onClick}>
         <Typo14WhiteRubikMedium>{content}</Typo14WhiteRubikMedium>
      </ButtonStyleComponent>
   )
}

export default Button
