import React ,{Component} from "react"
import {inject,observer} from "mobx-react"


import LoadingWrapperWithFailure from "../../Common/components/LoadingWrapperWithFailure";
import {IbHubsLogo} from "../../Common/components/Logos/IbHubsLogo";
import {getUserDetails} from "../../Authentication/utils/LocalStrorageUtils"
import strings from "../i18n/strings.json";
import {ProfileLogo} from "../components/ProfileLogo";
import {ProjectTitleAndLogo,UserNameAndLogo,HeaderContainer,ProjectTitle,UserName,
LogOutButton,ProjectsContainer} from "./stylesComponent";


const  withPmpHeader  =(Wrapped)=>{

  return (observer(inject('authenticationStore','userDetailsStore')(class extends Component{
        componentDidMount(){
            // this.doNetWorkCall()
        }
        
        doNetWorkCall (){
            this.props.userDetailsStore.getUserDetailsApi();
        }
        
        renderSuccessUI = () =>{
        const {userLogOut} =this.props.authenticationStore
        const {name} = getUserDetails()
          return(
          <ProjectsContainer>
           
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
                </HeaderContainer>
            </ProjectsContainer>);
    }
    render(){
    const {getUserDetailsApiStatus,getUserDetailsApiError,userDetails} = this.props.userDetailsStore
      return (<Wrapped {...this.props}/>)
    }
})))}




export default withPmpHeader ;