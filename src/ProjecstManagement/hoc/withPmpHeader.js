import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
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
   ProjectContainer,
   Button
} from './stylesComponent'
import {
   videosPageOne,
   videosPageTwo,
   videosPageThree,
   videosPageFour
} from '../constants/RouteConstants'

const withPmpHeader = WrappedComponent => {
   @inject('authenticationStore', 'userDetailsStore')
   @observer
   class RenderComponent extends Component {
      render() {
         const { userLogOut } = this.props.authenticationStore
         const { history } = this.props
         return (
            <ProjectContainer>
               <HeaderContainer>
                  <ProjectTitleAndLogo>
                     <IbHubsLogo />
                     <ProjectTitle>{strings.ProjectManageMent}</ProjectTitle>
                  </ProjectTitleAndLogo>
                  <UserNameAndLogo>
                     <LogOutButton onClick={userLogOut}>SIGN OUT</LogOutButton>
                     <UserName>jaya chandra</UserName>
                     <ProfileLogo />
                  </UserNameAndLogo>
               </HeaderContainer>
               <div style={{ display: 'flex' ,marginTop:"20px"}}>
                  <Button
                     onClick={() => {
                        history.push(videosPageTwo)
                     }}
                  >
                     {' '}
                     videos Page -1
                  </Button>
                  <Button
                     onClick={() => {
                        history.push(videosPageThree)
                     }}
                  >
                     {' '}
                     videos Page -2
                  </Button>
                  <Button
                     onClick={() => {
                        history.push(videosPageFour)
                     }}
                  >
                     {' '}
                     videos Page -3
                  </Button>
               </div>

               <WrappedComponent is_admin={true} {...this.props} />
            </ProjectContainer>
         )
      }
   }
   return withRouter(RenderComponent)
}

export default withPmpHeader
