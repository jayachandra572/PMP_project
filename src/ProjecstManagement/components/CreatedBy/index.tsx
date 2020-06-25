import React, { Component } from 'react'

import { ProfileLogo } from '../ProfileLogo'
import { CreatedByContainer, UserName } from './styleComponent'
import { CreatedBy as CreatedObject } from "../../stores/type"

interface CreatedByProps{
   userDetails:CreatedObject
}

function CreatedBy (props:CreatedByProps){
      const { profile_pic, name } = props.userDetails
      return (
         <CreatedByContainer>
            <ProfileLogo imageUrl={profile_pic} size={32} />
            <UserName>{name}</UserName>
         </CreatedByContainer>
      )
}

export { CreatedBy }
