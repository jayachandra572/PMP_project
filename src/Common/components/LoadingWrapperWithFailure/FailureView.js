import React from 'react'
import { observer } from 'mobx-react'

import pageNotFound from "../Asserts/pageNotFound.png"
import {
   FailureViewContainer,
   FailureViewMessage,
   RetryButton,
   NoDataViewImg
} from './styledComponents'

@observer
class FailureView extends React.Component {
   render() {
      const { onRetryClick, errorMessage } = this.props

      return (
         <FailureViewContainer>
            <NoDataViewImg src = {NoDataViewImg} alt = "page not found"/>
            <FailureViewMessage>{errorMessage}</FailureViewMessage>
            <RetryButton onClick={onRetryClick}>Retry</RetryButton>
         </FailureViewContainer>
      )
   }
}

export default FailureView
