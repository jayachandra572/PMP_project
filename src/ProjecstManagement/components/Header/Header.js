import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { IbHubsLogo } from '../../../Common/components/Logos/IbHubsLogo'
import { getUserDetails } from '../../../Authentication/utils/LocalStrorageUtils'
import strings from '../../i18n/strings.json'
import { ProfileLogo } from '../ProfileLogo'
import {
   ProjectTitleAndLogo,
   UserNameAndLogo,
   HeaderContainer,
   ProjectTitle,
   UserName,
   LogOutButton
} from './stylesComponent'

@inject('userDetailsStore')
@observer
class Header extends Component {
   profilePic = null
   name
   componentDidMount() {
      this.props.userDetailsStore.getUserDetailsApi()
   }
   render() {
      const { userLogOut } = this.props
      if (this.props.userDetailsStore.userDetails !== null) {
         this.name = this.props.userDetailsStore.userDetails.name
         this.profilePic = this.props.userDetailsStore.userDetails.profile_pic
      }

      return (
         <HeaderContainer>
            <ProjectTitleAndLogo>
               <IbHubsLogo />
               <ProjectTitle>{strings.ProjectManageMent}</ProjectTitle>
            </ProjectTitleAndLogo>
            <UserNameAndLogo>
               <LogOutButton onClick={userLogOut}>SIGN OUT</LogOutButton>
               <UserName>{this.name}</UserName>
               <ProfileLogo imageUrl={this.profile_pic} />
            </UserNameAndLogo>
         </HeaderContainer>
      )
   }
}

export { Header }
