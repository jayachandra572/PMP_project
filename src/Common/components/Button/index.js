import React from 'react'
import Loader from 'react-loader-spinner'
import { API_FETCHING,API_SUCCESS } from '@ib/api-constants'

import {Typo14WhiteRubikMedium} from "../../../styleGuide/Typos"
import { ButtonStyleComponent } from './stylesComponent'

class Button extends React.Component {
   static defaultProps = {
      apiStatus:API_SUCCESS
   }
   render(){
      let { content, onClick, apiStatus, className } = this.props
      const disabled = apiStatus === API_FETCHING ? 'disabled' : ''
      content =
         apiStatus === API_FETCHING ? (
            <Loader
               type='TailSpin'
               color='white'
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
}

export default Button
