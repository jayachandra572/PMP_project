import React from 'react'
import { toast, Slide } from 'react-toastify'
import { css } from 'glamor'
import { getUserDisplayableErrorMessage } from '../../Common/utils/APIUtils'
import 'react-toastify/dist/ReactToastify.css'

toast.configure({
   position: toast.POSITION.BOTTOM_CENTER,
   autoClose: 3000,
   transition: Slide,
   pauseOnFocusLoss: false,
   hideProgressBar: true,
   className: css({
      backgroundColor: 'red',
      color: 'black'
   }),
   bodyClassName: css({
      backgroundColor: 'blue',
      height: '100%',
      width: '100%'
   })
})

export default function(type, message) {
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
