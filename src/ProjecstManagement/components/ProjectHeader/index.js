import React,{Component} from "react";

import { Button } from 'semantic-ui-react';
import strings from "../../i18n/strings";


import {AddProjectModal} from "../AddProjectModal";


import {ProjectHeaderContainer,ProjectTitle,} from "./styleComponent";
function ProjectHeader(props){
    return (
    <ProjectHeaderContainer>
        <ProjectTitle>{strings.ProjectTitle}</ProjectTitle>
        <AddProjectModal />
    </ProjectHeaderContainer>);
}
export {ProjectHeader};