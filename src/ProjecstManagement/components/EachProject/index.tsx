import React, { Component } from 'react'

import { CreatedBy } from '../CreatedBy'
import {
   ProjectName,
   WorkFlow,
   Description,
   CreatedAt,
   ProjectContainer
} from './styleComponent'

type project = {
   id:string
   name:string
   workFlowType:{id:string,name:string}
   createdBy:object
   description:string
   createdAt:string
}

type propsType = {
   index:number
   onClick:(id:string)=>{}
   project:project
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
         <WorkFlow id={workFlowType.id}>{workFlowType.name}</WorkFlow>
         <CreatedBy userDetails={createdBy} />
         <Description>{description}</Description>
         <CreatedAt>{createdAt}</CreatedAt>
      </ProjectContainer>
   )
}
export { EachProject }
