import React, { Component } from 'react'

import imagesSrc from './imagesSrc.json'
class IbHubsLogo extends Component {
   static defaultProps = {
      width: '90px',
      height: '90px'
   }

   render() {
      const { width, height } = this.props
      return (
         <img
            src={imagesSrc.ibHubsLogo}
            style={{ width: width, height: height }}
         />
      )
   }
}

export { IbHubsLogo }
