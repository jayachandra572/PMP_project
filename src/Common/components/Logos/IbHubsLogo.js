import React, { Component } from 'react'

import Images from '../../themes/Images'
class IbHubsLogo extends Component {
   static defaultProps = {
      width: '90px',
      height: '90px'
   }

   render() {
      const { width, height } = this.props
      return (
         <img
            src={Images.ibHubsLogo}
            style={{ width: width, height: height }}
            alt='iB_Hubs_Logo'
         />
      )
   }
}

export { IbHubsLogo }
