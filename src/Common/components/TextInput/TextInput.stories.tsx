import React from 'react'
import { action } from '@storybook/addon-actions'
import { withKnobs, text } from '@storybook/addon-knobs'

import TextInput from '.'

export default {
  component:TextInput,
  title: 'Common/TextInput'
}

let TextInputProps = {
    errorMessage:{shouldShowError:false,message:""},
   onBlur:(isValid:boolean,value:string) => {},
   validation : (value:string) => false,
   placeHolderText:"userName",
   id:"1",
}

export const defaultView = () => <TextInput {...TextInputProps}/>

export const knobs = () => (
  <TextInput
    {...TextInputProps} onBlur = {action("onBlur input")} placeHolderText={text("placeholder","username")}
  />
)

knobs.story = {
  decorators: [withKnobs]
}
