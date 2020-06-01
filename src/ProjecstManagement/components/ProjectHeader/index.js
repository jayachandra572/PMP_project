import React,{Component} from "react";
import {withRouter} from "react-router-dom"

import strings from "../../i18n/strings";


import {AddProjectModal} from "../AddProjectModal";


import {ProjectHeaderContainer,ProjectTitle,CreateWorkFlow} from "./styleComponent";
class  ProjectHeader extends Component{
    navigateToWorkFLow = () =>{
        this.props.history.push("/flowCreate")
    }
    
    render(){
    const {userRole} =this.props;
        return (
        <ProjectHeaderContainer>
            <ProjectTitle>{strings.ProjectTitle}</ProjectTitle>
            <CreateWorkFlow onClick = {this.navigateToWorkFLow}>Creat Workflow</CreateWorkFlow>
            <AddProjectModal />
        </ProjectHeaderContainer>);
    }
}
export default withRouter(ProjectHeader)