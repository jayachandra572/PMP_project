import React ,{Fragment}from 'react'
import { observer } from 'mobx-react'

import {
   FailureViewMessage,
   RetryButton
} from './styleComponent'

@observer
class FailureView extends React.Component {
   render() {
      const { onRetryClick } = this.props;
      const errorMessage = "Something went wrong"
      return (
         <Fragment>
            <FailureViewMessage>{errorMessage}</FailureViewMessage>
            <RetryButton onClick={onRetryClick}>Retry</RetryButton>
         </Fragment>);
   }
}

export default FailureView;