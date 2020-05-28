import React , {Component} from "react"

import {CreatedBy} from "../CreatedBy"
import {ProjectName,WorkFlow,Description,CreatedAt,Container} from "./styleComponent"

function EachProject(props){
    const {index,project:{workFlowType,createdBy,description,createdAt,name}} = props;
    const isOdd = index%2 ===1;
    return(
            <Container isOdd = {isOdd} >
                <ProjectName>{name}</ProjectName>
                <WorkFlow>workflowType</WorkFlow>
                <CreatedBy name = {createdBy} />
                <Description>{description}</Description>
                <CreatedAt>{createdAt}</CreatedAt>
            </Container>
        );
}
export {EachProject};