import React ,{Component} from "react"

import {Typo24DarkBlueGreyHKGroteskMedium,
        Typo18DarkBlueGreyHKGroteskMedium
} from "../../../styleGuide/Typos";
import {IbHubsLogo} from "../../../Common/components/Logos/IbHubsLogo";
import strings from "../../i18n/strings.json";
import {ProfileLogo} from "../common/ProfileLogo";
import {ProjectTitleAndLogo,UserNameAndLogo,HeaderContainer} from "./stylesComponent";


class Header extends Component{
    render(){
        return(
                <HeaderContainer>
                    <ProjectTitleAndLogo>
                        <IbHubsLogo/>
                        <Typo24DarkBlueGreyHKGroteskMedium>
                            {strings.ProjectManageMent}
                        </Typo24DarkBlueGreyHKGroteskMedium>
                    </ProjectTitleAndLogo>
                    <UserNameAndLogo>
                        <Typo18DarkBlueGreyHKGroteskMedium>
                            {"jaya"}
                        </Typo18DarkBlueGreyHKGroteskMedium>
                        <ProfileLogo />
                    </UserNameAndLogo>
                </HeaderContainer>);
    }
} 

export {Header};