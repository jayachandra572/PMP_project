import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { Provider } from 'mobx-react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { Input } from 'semantic-ui-react'

import DropDown from '.'

describe('Test cases for Dropdown Component', () => {
   it('should test display value', () => {
      const onChangeMockFn = jest.fn()
      const props = {
         onChange: onChangeMockFn,
         options: [
            { id: '1', name: 'management', onClick: onChangeMockFn },
            { id: '2', name: 'software', onClick: onChangeMockFn },
            { id: '3', name: 'hardware', onClick: onChangeMockFn }
         ],
         value: '1',
         onClick:onChangeMockFn
      }
      const { debug, getByRole } = render(
         <DropDown {...props} />
      )
      const dropdown = getByRole('listbox')
      fireEvent.click(dropdown)
      fireEvent.change(dropdown,{data:{value:"2"}})
      expect(onChangeMockFn).toBeCalled()
   })
   
   it('should test render dropdown without raising error',()=>{
      const { debug, getByRole } = render(
         <DropDown />
      )
      getByRole('listbox')
   }
   )
})
