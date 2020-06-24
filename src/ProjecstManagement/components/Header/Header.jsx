import React from "react"
import {IbHubsLogo} from "../../../Common/components/Logos/IbHubsLogo"
import {ProfileLogo} from "../ProfileLogo"
import strings from "../../i18n/strings.json"
import {
    ProjectTitleAndLogo,
    UserNameAndLogo,
    HeaderContainer,
    ProjectTitle,
    UserName,
    LogOutButton
 } from './stylesComponent'

function Header(props){
    const {name,userLogOut} = props;
    return(
        <HeaderContainer>
                  <ProjectTitleAndLogo>
                     <IbHubsLogo/> 
                     <ProjectTitle>{strings.ProjectManageMent}</ProjectTitle>
                  </ProjectTitleAndLogo>
                  <UserNameAndLogo>
                     <LogOutButton onClick={userLogOut}>SIGN OUT</LogOutButton>
                     <UserName>{name}</UserName>
                     <ProfileLogo />
                  </UserNameAndLogo>
               </HeaderContainer>
    )
}

export {Header}