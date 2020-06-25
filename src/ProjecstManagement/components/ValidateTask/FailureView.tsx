import React from 'react'
import { observer } from 'mobx-react'

import {
   FailureViewMessage,
   RetryButton,
   FailureAndLoadingContainer
} from './styleComponent'

interface FailureViewProps {
   onRetryClick:() => void
}

const FailureView = observer((props:FailureViewProps) => {
      const { onRetryClick } = props
      const errorMessage = 'Something went wrong'
      return (
         <FailureAndLoadingContainer>
            <FailureViewMessage>{errorMessage}</FailureViewMessage>
            <RetryButton onClick={onRetryClick}>Retry</RetryButton>
         </FailureAndLoadingContainer>
      )
   })

export default FailureView
