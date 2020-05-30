import React ,{Component} from "react"


import {IbHubsLogo} from "../../../Common/components/Logos/IbHubsLogo";
import strings from "../../i18n/strings.json";
import {ProfileLogo} from "../ProfileLogo";
import {ProjectTitleAndLogo,UserNameAndLogo,HeaderContainer,ProjectTitle,UserName,LogOutButton} from "./stylesComponent";


class Header extends Component{
    render(){
        const {userLogOut} =this.props
        return(
                <HeaderContainer>
                    <ProjectTitleAndLogo>
                        <IbHubsLogo/>
                        <ProjectTitle>
                            {strings.ProjectManageMent}
                        </ProjectTitle>
                    </ProjectTitleAndLogo>
                    <UserNameAndLogo>
                        <LogOutButton onClick = {userLogOut}>SIGN OUT</LogOutButton>
                        <UserName>
                            {strings.name}
                        </UserName>
                        <ProfileLogo />
                    </UserNameAndLogo>
                </HeaderContainer>);
    }
} 

export {Header};