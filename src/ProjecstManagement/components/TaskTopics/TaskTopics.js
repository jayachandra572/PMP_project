import React ,{Component} from "react"

import strings from "../../i18n/strings.json";
import {TaskTopicsContainer,Heading} from "./styleComponent"
 class TaskTopics extends Component{
    render(){
        const {issueType,title,description,createdBy,createdAt,state} = strings.tasks.modal;
        return(
            <TaskTopicsContainer>
                <Heading>{issueType}</Heading>
                <Heading>{title}</Heading>
                <Heading>{createdBy}</Heading>
                <Heading>{description}</Heading>
                <Heading>{createdAt}</Heading>
                <Heading>{state}</Heading>
            </TaskTopicsContainer>
            
            )
    }
}

export {TaskTopics};
