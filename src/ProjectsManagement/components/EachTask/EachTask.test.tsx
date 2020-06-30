import React from 'react'
import { render } from '@testing-library/react'

import taskResponseData from '../../fixtures/taskResponseData.json'
import { EachTask } from '.'
import ApiCallModel from '../../stores/models/ApiCallModel'
import TaskModel from '../../stores/models/TaskModel'
import TasksAPIService from '../../services/TasksService/index.fixtures'

describe('Test Cases for EachTask component', () => {
   it('should render task details', () => {
      const task = taskResponseData.Tasks[0]
      const props = {
         index: 1,
         task: new TaskModel(task, new TasksAPIService()),
         doNetWorkCall: () => {},
         taskValidationField: new ApiCallModel(() => {})
      }
      const { getByText } = render(<EachTask {...props} />)
      const { description, createdAt, state, title } = props.task
      getByText(description)
      getByText(createdAt)
      getByText(title)
   })
})
