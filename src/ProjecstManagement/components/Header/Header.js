import React ,{Component} from "react"
import {inject} from "mobx-react"

import {IbHubsLogo} from "../../../Common/components/Logos/IbHubsLogo";
import {getUserDetails} from "../../../Authentication/utils/LocalStrorageUtils"
import strings from "../../i18n/strings.json";
import {ProfileLogo} from "../ProfileLogo";
import {ProjectTitleAndLogo,UserNameAndLogo,HeaderContainer,ProjectTitle,UserName,LogOutButton} from "./stylesComponent";

@inject('userDetailsStore')
class Header extends Component{
   componentDidMount(){
       this.props.userDetailsStore.getUserDetailsApi();
   }
    render(){
        const {userLogOut} =this.props
        const {name} = getUserDetails();
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
                            {name}
                        </UserName>
                        <ProfileLogo />
                    </UserNameAndLogo>
                </HeaderContainer>);
    }
} 

export {Header};