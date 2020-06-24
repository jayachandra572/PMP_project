import React from 'react'
import { toast, Slide } from 'react-toastify'
import { css } from 'glamor'
import { getUserDisplayableErrorMessage } from '../../Common/utils/APIUtils'
import 'react-toastify/dist/ReactToastify.css'

//TODO:need to give type of css properties and enums of toast position
const styling:any =css({
   backgroundColor: 'red',
   color: 'black'
})

const toastPosition:any = toast.POSITION.BOTTOM_CENTER

toast.configure({
   position: toastPosition,
   autoClose: 3000,
   transition: Slide,
   pauseOnFocusLoss: false,
   hideProgressBar: true,
   className: styling
})

export default function(type:string, message:string) {
   switch (type) {
      case 'success':
         toast.success(message)
         break

      case 'error':
         toast.error(getUserDisplayableErrorMessage(message))
         break

      case 'info':
         toast.info(message)
         break

      case 'warn':
         toast.warn(message)
         break

      default:
         toast(message)
         break
   }
}
