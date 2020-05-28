import React , {Component} from "react"

import {CreatedBy} from "./CreatedBy"
import {ProjectName,WorkFlow,Description,CreatedAt,Container} from "./stylesComponent"

function EachProject(props){
    const {index,project:{workflow_type,created_by,description,created_at,name}} = props;
    const isOdd = index%2 ===1;
    console.log(isOdd,index)
    return(
            <Container isOdd = {isOdd}>
                <ProjectName>{name}</ProjectName>
                <WorkFlow>workflow_type</WorkFlow>
                <CreatedBy name = {created_by} />
                <Description>{description}</Description>
                <CreatedAt>{created_at}</CreatedAt>
            </Container>
        );
}
export {EachProject};