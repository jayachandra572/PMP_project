import React , {Component} from "react"

import {CreatedBy} from "../CreatedBy"
import {ProjectName,WorkFlow,Description,CreatedAt,ProjectContainer} from "./styleComponent"

function EachProject(props){
    const {index,onClick,project:{workFlowType,createdBy,description,createdAt,name}} = props;
    const isOdd = index%2 ===1;
    return(
            <ProjectContainer isOdd = {isOdd} onClick= {onClick} >
                <ProjectName>{name}</ProjectName>
                <WorkFlow>workflowType</WorkFlow>
                <CreatedBy name = {createdBy} />
                <Description>{description}</Description>
                <CreatedAt>{createdAt}</CreatedAt>
            </ProjectContainer>
        );
}
export {EachProject};