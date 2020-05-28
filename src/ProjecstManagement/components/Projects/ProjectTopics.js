import React ,{Component} from "react"

import strings from "../../i18n/strings.json";
import {ProjectTopicsContainer,Heading} from "./stylesComponent"
export class ProjectTopics extends Component{
    render(){
        const {name,workFlow,createdBy,description,createdAt} = strings.project
        return(
            <ProjectTopicsContainer>
                <Heading>{name}</Heading>
                <Heading>{workFlow}</Heading>
                <Heading>{createdBy}</Heading>
                <Heading>{description}</Heading>
                <Heading>{createdAt}</Heading>
            </ProjectTopicsContainer>
            
            )
    }
} 