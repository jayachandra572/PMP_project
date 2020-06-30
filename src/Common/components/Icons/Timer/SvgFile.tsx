import * as React from 'react'

function SvgComponent<T>(props: T) {
   return (
      <svg width={14} height={12} fill='none' viewBox='0 0 14 12' {...props}>
         <path
            fill='#fff'
            d='M7 0C3.14 0 0 2.692 0 6s3.14 6 7 6 7-2.692 7-6-3.14-6-7-6zm0 11.25C3.623 11.25.875 8.895.875 6S3.623.75 7 .75 13.125 3.105 13.125 6 10.377 11.25 7 11.25z'
         />
      </svg>
   )
}

export default SvgComponent
