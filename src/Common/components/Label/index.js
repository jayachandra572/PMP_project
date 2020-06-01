import React from 'react'

import { Label ,Star } from './styleComponent'
function InputLabel(props) {
   const { lableFor, content,className,isImportant } = props

   return <Label className = {className} htmlFor={lableFor}>
   {content} {isImportant&&<Star>*</Star>}
   </Label>
}

export { InputLabel }
