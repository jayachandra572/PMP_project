import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import strings from '../../i18n/strings.json'
import CloseButtonWithIcon from '.'

describe('Test cases of CloseButtonWithIcon', () => {
   it('should test close button onclickMethod', () => {
      const mockOnClickFn = jest.fn()
      const { getByTestId } = render(
         <CloseButtonWithIcon onClick={mockOnClickFn} />
      )
      const closeButton = getByTestId(strings.closeIconTestId)
      fireEvent.click(closeButton)
      expect(mockOnClickFn).toBeCalled()
   })
})
