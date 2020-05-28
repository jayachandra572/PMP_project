import React ,{Component} from "react"


import {IbHubsLogo} from "../../../Common/components/Logos/IbHubsLogo";
import strings from "../../i18n/strings.json";
import {ProfileLogo} from "../ProfileLogo";
import {ProjectTitleAndLogo,UserNameAndLogo,HeaderContainer,ProjectTitle,UserName} from "./stylesComponent";


class Header extends Component{
    render(){
        return(
                <HeaderContainer>
                    <ProjectTitleAndLogo>
                        <IbHubsLogo/>
                        <ProjectTitle>
                            {strings.ProjectManageMent}
                        </ProjectTitle>
                    </ProjectTitleAndLogo>
                    <UserNameAndLogo>
                        <UserName>
                            {strings.name}
                        </UserName>
                        <ProfileLogo />
                    </UserNameAndLogo>
                </HeaderContainer>);
    }
} 

export {Header};