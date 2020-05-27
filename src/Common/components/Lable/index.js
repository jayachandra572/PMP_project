import React from 'react'

import { Label } from './styleComponent'
function InputLabel(props) {
   const { lableFor, content } = props

   return <Label htmlFor={lableFor}>{content}</Label>
}

export { InputLabel }
