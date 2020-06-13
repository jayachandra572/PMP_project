import React from 'react'
import { render } from '@testing-library/react'

import strings from '../../i18n/strings.json'
import { AddProjectModal } from '.'

describe('Test cases for AddProjectModal ', () => {
   it('should test onCLick create project button open  modal', () => {
      const { getByRole } = render(<AddProjectModal />)

      const creatProject = getByRole('button', {
         name: strings.createButtonContent
      })
   })
})
