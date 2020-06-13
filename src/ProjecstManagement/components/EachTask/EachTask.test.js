import React from 'react'
import { render } from '@testing-library/react'

import { EachTask } from '.'

describe('Test Cases for EachTask component', () => {
   it('should render task details', () => {
      const props = {
         index: 1,
         task: {
            issueType: 'issueType',
            title: 'title',
            description: 'description',
            createdBy: 'createdBy',
            createdAt: 'createdAt',
            state: 'state'
         }
      }
      const { getByText } = render(<EachTask {...props} />)
      const { description, createdAt, issueType, state, title } = props.task
      getByText(description)
      getByText(createdAt)
      getByText(title)
      getByText(issueType)
   })
})
