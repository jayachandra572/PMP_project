import React from 'react'
import { render } from '@testing-library/react'
import { API_SUCCESS } from "@ib/api-constants"


import strings from '../../i18n/strings.json'
import { AddProjectModal } from '.'

describe('Test cases for AddProjectModal ', () => {
   it('should test onCLick create project button open  modal', () => {
      const props = {
         doNetWorkCall:()=>{},
         apiStatus:API_SUCCESS
      }
      const { getByRole } = render(<AddProjectModal {...props}/>)

       getByRole('button', {
         name: strings.createButtonContent
      })
   })
})
