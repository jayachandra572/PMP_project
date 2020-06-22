import React, { Component, Fragment } from 'react'
import strings from '../../i18n/strings.json'
import { RiCloseLine } from 'react-icons/ri'
import {CloseButton} from "./stylesComponent"

class CloseButtonWithIcon extends Component {
   static defaultProps = {
      size: 24
   }
   render() {
      const { onClick, size, className } = this.props
      return (
         <Fragment>
            <CloseButton
               data-testid={strings.closeIconTestId}
               className={className}
               onClick={onClick}
            >
               <RiCloseLine size={size} />
            </CloseButton>
         </Fragment>
      )
   }
}
export default CloseButtonWithIcon
