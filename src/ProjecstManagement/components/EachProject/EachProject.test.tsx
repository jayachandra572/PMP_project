import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { Router, Route, withRouter } from 'react-router-dom'

import { EachProject } from '.'

describe('Test Cases for EachProject component', () => {
   it('should render project details', () => {
      const props = {
         index: 1,
         onClick: Function,
         project: {
            id:"1",
            workFlowType: {id:1,name:"WorkFlowType1"},
            createdBy: {id:1,name:"jaya","profile_pic":""},
            description: 'description',
            createdAt: 'createdAt',
            name: 'name'
         }
      }
      const { getByText } = render(<EachProject {...props} />)
      const { description, createdAt, name } = props.project
      getByText(description)
      getByText(createdAt)
      getByText(name)
   })
})