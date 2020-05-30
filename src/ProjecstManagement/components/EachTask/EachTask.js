import React , {Component} from "react"

import {CreatedBy} from "../CreatedBy"
import {IssueType,Title,Description,CreatedAt,State,TaskContainer} from "./styleComponent"

function EachTask(props){
    const {index,task:{issueType,title,description,createdBy,createdAt,state}} = props;
    const isOdd = index%2 ===1;
    return(
            <TaskContainer isOdd = {isOdd} >
                <IssueType>{issueType}</IssueType>
                <Title>{title}</Title>
                <CreatedBy name = {createdBy} />
                <Description>{description}</Description>
                <CreatedAt>{createdAt}</CreatedAt>
                <State>{state}</State>
            </TaskContainer>
        );
}

export {EachTask};