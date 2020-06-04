import React,{Component} from "react";
import {withRouter} from "react-router-dom"

import strings from "../../i18n/strings";


import {AddProjectModal} from "../AddProjectModal";


import {ProjectHeaderContainer,ProjectTitle} from "./styleComponent";
class  ProjectHeader extends Component{
    render(){
    const {userRole} =this.props;
        return (
        <ProjectHeaderContainer>
            <ProjectTitle>{strings.ProjectTitle}</ProjectTitle>
            <AddProjectModal />
        </ProjectHeaderContainer>);
    }
}
export default withRouter(ProjectHeader)