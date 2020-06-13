import React, { Component } from 'react'

import { ProfileLogo } from '../ProfileLogo'
import { CreatedByContainer, UserName } from './styleComponent'

class CreatedBy extends Component {
   render() {
      const { profile_pic, name } = this.props.userDetails
      return (
         <CreatedByContainer>
            <ProfileLogo imageUrl={profile_pic} size={32} />
            <UserName>{name}</UserName>
         </CreatedByContainer>
      )
   }
}

export { CreatedBy }
