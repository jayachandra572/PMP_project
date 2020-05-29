import React from 'react'

import { Label } from './styleComponent'
function InputLabel(props) {
   const { lableFor, content,className } = props

   return <Label className = {className} htmlFor={lableFor}>{content}</Label>
}

export { InputLabel }
