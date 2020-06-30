import React, { Component } from 'react'

import {
   InputField
} from './stylesComponent'
import { observer } from "mobx-react"
import { observable, action } from "mobx"

type OnChangeEventType = React.ChangeEvent<HTMLInputElement>

type OnFocusEvent = React.FocusEvent<HTMLInputElement>
interface ErrorMessage{
   shouldShowError:boolean
   message:string
}

interface TextInputProps {
   errorMessage:ErrorMessage
   onBlur:(isValid:boolean,value:string) => void
   validation : (value:string) => boolean
   placeHolderText:string
   textType:string
   id:string
   className?:string
}

@observer
class TextInput extends Component<TextInputProps> {
   @observable value = ""
   @observable isError = false

   static defaultProps = {
      textType: 'text'
   }

   @action.bound
   onChangeValue (event:OnChangeEventType){
      this.value = event.target.value
   }

   onBlurTextInput = (E:OnFocusEvent)=>{
         this.props.onBlur(false,this.value)
   }

   render() {
      const {
         textType,
         className, 
         id,
         placeHolderText,
      } = this.props
      const {value,onChangeValue,isError,onBlurTextInput} = this
      return (
            <InputField
               placeholder = {placeHolderText}
               className={className}
               type={textType}
               id={id}
               data-testid={id}
               value={value}
               onChange={onChangeValue}
               onBlur = {onBlurTextInput}
               isError = {isError}
            />
      )
   }
}

export default TextInput
