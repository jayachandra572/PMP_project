import React, { Component } from 'react'

import {
   InputContainer,
   ErrorMessage,
   ContentArea,
   ErrorIcon
} from './stylesComponent'

import Colors from '../../themes/Colors'

class InputField extends Component {
   static defaultProps = {
      isError: false,
      errorMessage: '',
      id:'',
      textType:"text"
   }
   render() {
      const {
         textType,
         value,
         onChange,
         id,
         errorMessage,
         isError,
         className
      } = this.props
      return (
         <InputContainer className={className}>
            <ContentArea
               isError={isError}
               type={textType}
               id={id}
               data-testid='inputText'
               value={value}
               onChange={onChange}
            />
            {isError && <ErrorIcon size={16} color={Colors.neonRed} />}
            {isError && <ErrorMessage>{errorMessage}</ErrorMessage>}
         </InputContainer>
      )
   }
}

export { InputField }
