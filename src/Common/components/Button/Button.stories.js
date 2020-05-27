import React from 'react'
import { API_FETCHING, API_SUCCESS } from '@ib/api-constants'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'
import Button from './'

export default {
   decorators: [withKnobs],
   title: 'Common/Button'
}

export const LoadingButton = () => (
   <Button content={'Sign'} apiStatus={API_FETCHING} />
)
export const TextButton = () => (
   <Button content={'Sign'} apiStatus={API_SUCCESS} />
)
