import React,{Component} from "react";

import {getUserDetails} from "../../../Authentication/utils/LocalStrorageUtils"
import strings from "../../i18n/strings";
import {AddProjectModal} from "../AddProjectModal";


import {ProjectHeaderContainer,ProjectTitle} from "./styleComponent";
class  ProjectHeader extends Component{
    render(){
    const {userRole,doNetWorkCall} =this.props;
    const {is_admin} = getUserDetails();
    console.log(getUserDetails())
        return (
        <ProjectHeaderContainer>
            <ProjectTitle>{strings.ProjectTitle}</ProjectTitle>
            {is_admin&&<AddProjectModal doNetWorkCall={doNetWorkCall}/>}
        </ProjectHeaderContainer>);
    }
}
export default ProjectHeader