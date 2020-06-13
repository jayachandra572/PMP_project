import React, { Fragment } from 'react'
import Loader from 'react-loader-spinner'
import { FailureAndLoadingContainer } from './styleComponent'

function LoadingView() {
   return (
      <FailureAndLoadingContainer>
         <Loader
            type='ThreeDots'
            color='#00BFFF'
            text-align='center'
            height={90}
            width={90}
         />
      </FailureAndLoadingContainer>
   )
}

export default LoadingView
