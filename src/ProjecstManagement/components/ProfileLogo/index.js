import React, { Component } from 'react'

import Images from '../../themes/Images'
import { ProfileLogoStyles } from './styleComponent'
export class ProfileLogo extends Component {
   static defaultProps = {
      size: 48,
      imageUrl:
         'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'
   }
   render() {
      const { imageUrl, size } = this.props
      return <ProfileLogoStyles src={imageUrl} size={size} alt='Logo' />
   }
}
