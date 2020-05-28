import React,{Component} from "react"

import strings from "../../i18n/strings";
import {ProjectHeaderContainer,ProjectTitle,CreatProjectButton} from "./styleComponent"
function ProjectHeader(props){
    const {} = props;
    return (
    <ProjectHeaderContainer>
        <ProjectTitle>{strings.ProjectTitle}</ProjectTitle>
        <CreatProjectButton content = {strings.createButtonContent} onClcik ={()=>{}}/>
    </ProjectHeaderContainer>)
}
export {ProjectHeader}