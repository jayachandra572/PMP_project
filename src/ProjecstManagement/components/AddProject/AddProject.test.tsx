import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { Provider } from 'mobx-react'

import NewProjectService from '../../services/NewProjectService/index.fixtures'
import NewProjectStore from '../../stores/NewProjectStore'

import { AddProject } from '.'

let newProjectStore:NewProjectStore
let newProjectService:NewProjectService

const getScreen = () => {
   const props = {
      doNetWorkCall : () => {},
      handleClose : () => {}
   }
   return render(
      <Provider newProjectStore={newProjectStore}>
         <AddProject {...props}/>
      </Provider>
   )
}

describe('Test cases for AddProject Form  ', () => {
   beforeEach(() => {
      newProjectService = new NewProjectService()
      newProjectStore = new NewProjectStore(newProjectService)
   })
   it('Should test render loading state', () => {
      const { getByText } = getScreen()
   })
})
