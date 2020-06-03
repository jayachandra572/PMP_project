import React ,{Fragment}from 'react'
import { observer } from 'mobx-react'

import {
   FailureViewMessage,
   RetryButton,
   FailureAndLoadingContainer
} from './styleComponent'
@observer
class FailureView extends React.Component {
   render() {
      const { onRetryClick } = this.props;
      const errorMessage = "Something went wrong"
      return (
         <FailureAndLoadingContainer>
            <FailureViewMessage>{errorMessage}</FailureViewMessage>
            <RetryButton onClick={onRetryClick}>Retry</RetryButton>
         </FailureAndLoadingContainer>);
   }
}

export default FailureView;