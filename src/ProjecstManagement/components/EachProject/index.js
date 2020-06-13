import React, { Component } from 'react'

import { CreatedBy } from '../CreatedBy'
import {
   ProjectName,
   WorkFlow,
   Description,
   CreatedAt,
   ProjectContainer
} from './styleComponent'

function EachProject(props) {
   const {
      index,
      onClick,
      project: { workFlowType, createdBy, description, createdAt, name, id }
   } = props
   const isOdd = index % 2 === 1
   return (
      <ProjectContainer id={id} isOdd={isOdd} onClick={() => onClick(id)}>
         <ProjectName>{name}</ProjectName>
         <WorkFlow id={workFlowType.id}>{workFlowType.name}</WorkFlow>
         <CreatedBy userDetails={createdBy} />
         <Description>{description}</Description>
         <CreatedAt>{createdAt}</CreatedAt>
      </ProjectContainer>
   )
}
export { EachProject }
