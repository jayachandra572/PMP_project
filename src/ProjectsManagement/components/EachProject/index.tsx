import React, { Component } from 'react'

import ProjectModel from "../../stores/models/ProjectModel"
import { CreatedBy } from '../CreatedBy'
import {
   ProjectName,
   WorkFlow,
   Description,
   CreatedAt,
   ProjectContainer
} from './styleComponent'


interface propsType {
   index:number
   onClick:(id:string)=> void
   project:ProjectModel
}

function EachProject(props:propsType) {
   const {
      index,
      onClick,
      project: { workFlowType, createdBy, description, createdAt, name, id }
   } = props
   const isOdd = index % 2 === 1
   return (
      <ProjectContainer
         data-testid={id}
         id={id}
         isOdd={isOdd}
         onClick={() => onClick(id)}
      >
         <ProjectName>{name}</ProjectName>
         <WorkFlow id={workFlowType.id.toString()}>{workFlowType.name}</WorkFlow>
         <CreatedBy userDetails={createdBy} />
         <Description>{description}</Description>
         <CreatedAt>{createdAt}</CreatedAt>
      </ProjectContainer>
   )
}
export { EachProject }
