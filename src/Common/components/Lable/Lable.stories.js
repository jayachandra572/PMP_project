import React from 'react'

import { withKnobs, text } from '@storybook/addon-knobs'

import { InputLabel } from '.'
export default {
   title: 'Common/Lable',
   decorators: [withKnobs]
}

export const Lable = () => <InputLabel text='UserName' />
export const knob = () => (
   <InputLabel lableFor='UserName' text={text('text', 'UserName')} />
)
