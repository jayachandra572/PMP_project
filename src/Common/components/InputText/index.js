import React, { Component } from 'react'

import { InputLabel } from '../Label'
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
      id: '',
      textType: 'text'
   }
   render() {
      const {
         textType,
         value,
         onChange,
         id,
         errorMessage,
         isError,
         className,
         forwardRef
      } = this.props
      return (
         <InputContainer>
            <ContentArea
               ref={forwardRef}
               className={className}
               isError={isError}
               type={textType}
               id={id}
               data-testid={id}
               value={value}
               onChange={onChange}
            />
            {isError && <ErrorIcon size={16} color={Colors.neonRed} />}
            {errorMessage !== '' && <ErrorMessage>{errorMessage}</ErrorMessage>}
         </InputContainer>
      )
   }
}

export { InputField }
