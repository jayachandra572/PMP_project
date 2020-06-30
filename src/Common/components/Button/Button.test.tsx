import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'

import Button from '.'
import { propagateChangeConfirmed } from 'mobx/lib/internal'
describe('should test Button', () => {
   it('should test button onclick event', () => {
      const mockOnClickButton = jest.fn()
      const buttonContent = 'Sign'
      const { getByRole } = render(
         <Button
            content={buttonContent}
            onClick={mockOnClickButton}
            apiStatus={200}
         />
      )
      const button = getByRole('button', { name: buttonContent })
      fireEvent.click(button)
      expect(mockOnClickButton).toBeCalled()
   })
})
