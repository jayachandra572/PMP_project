import React, { Component, Fragment } from 'react'
import strings from "../../i18n/strings.json"
import { RiCloseLine } from 'react-icons/ri'

class CloseButtonWithIcon extends Component {
   static defaultProps = {
      size: 24
   }
   render() {
      const { onClick, size, className } = this.props
      return (
         <Fragment>
            <button data-testid = {strings.closeIconTestId} className={className} onClick={onClick}>
               <RiCloseLine size={size} />
            </button>
         </Fragment>
      )
   }
}
export default CloseButtonWithIcon
