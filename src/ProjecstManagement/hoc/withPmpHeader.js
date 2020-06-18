import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import { IbHubsLogo } from '../../Common/components/Logos/IbHubsLogo'
import strings from '../i18n/strings.json'
import { ProfileLogo } from '../components/ProfileLogo'
import {
   ProjectTitleAndLogo,
   UserNameAndLogo,
   HeaderContainer,
   ProjectTitle,
   UserName,
   LogOutButton,
   ProjectContainer
} from './stylesComponent';

const withPmpHeader =((WrappedComponent) => {
         @inject(
         'authenticationStore',
         'userDetailsStore')
         @observer
         class RenderComponent extends Component {
            render() {
               const { userLogOut } = this.props.authenticationStore
               const { name ,is_admin} = this.props.userDetailsStore.userDetails
               return (<ProjectContainer>
                  <HeaderContainer>
                        <ProjectTitleAndLogo>
                           <IbHubsLogo />
                           <ProjectTitle>
                              {strings.ProjectManageMent}
                           </ProjectTitle>
                        </ProjectTitleAndLogo>
                        <UserNameAndLogo>
                           <LogOutButton onClick={userLogOut}>
                              SIGN OUT
                           </LogOutButton>
                           <UserName>{name}</UserName>
                           <ProfileLogo />
                        </UserNameAndLogo>
                     </HeaderContainer>
                     <WrappedComponent is_admin = {is_admin} {...this.props}/>
               </ProjectContainer>)
            }
         }
         return RenderComponent;
})

export default withPmpHeader
