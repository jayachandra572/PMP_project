import React,{Component} from "react"

import strings from "../../i18n/strings";
import {ProjectHeaderContainer,ProjectTitle,CreatProjectButton} from "./styleComponent"
function ProjectHeader(props){
    const {modalOpen } = props;
    
    return (
    <ProjectHeaderContainer>
        <ProjectTitle>{strings.ProjectTitle}</ProjectTitle>
        <CreatProjectButton content = {strings.createButtonContent} 
                  onClick={modalOpen}
                 />
    </ProjectHeaderContainer>)
}
export {ProjectHeader}