import React, { Component } from 'react'

import strings from '../../i18n/strings.json'
import { TaskTopicsContainer, Heading, Info } from './styleComponent'
class TaskTopics extends Component {
   render() {
      const {
         issueType,
         title,
         description,
         createdBy,
         createdAt,
         state,
         info
      } = strings.tasks.modal
      return (
         <TaskTopicsContainer>
            <Heading>{title}</Heading>
            <Heading>{issueType}</Heading>
            <Heading>{createdBy}</Heading>
            <Heading>{description}</Heading>
            <Heading>{createdAt}</Heading>
            <Heading>{state}</Heading>
            <Info>{info}</Info>
         </TaskTopicsContainer>
      )
   }
}

export { TaskTopics }
