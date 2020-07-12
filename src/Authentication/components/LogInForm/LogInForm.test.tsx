import React, { Suspense } from 'react'
import { render, waitFor } from '@testing-library/react'
import { API_SUCCESS } from '@ib/api-constants'

import i18n from '../../../Common/i18n'

import { LogInForm } from '.'

const props = {
   userName: 'test-user',
   userPassword: 'test-password',
   onChangeName: (e: any) => {},
   onChangePassword: (e: any) => {},
   onSubmitForm: (e: any) => {},
   getAuthApiStatus: API_SUCCESS,
   errorMessage: {
      userPasswordErrorMessage: '',
      userNameErrorMessage: ''
   }
}

describe('LogInForm tests', () => {
   it('Should render typed userName', async () => {
      const testUserName = 'test-user'
      const { getByTestId } = render(
         <Suspense fallback={<div />}>
            <LogInForm {...props} />
         </Suspense>
      )
      await waitFor(() => {
         const userNameField: any = getByTestId(i18n.t('auth:userNameLable'))
         expect(userNameField.value).toBe(testUserName)
      })
   })

   it('Should render typed userPassword', () => {
      const testUserPassword = 'test-password'
      const { getByLabelText } = render(<LogInForm {...props} />)
      const userPasswordField: any = getByLabelText(
         i18n.t('auth:userPasswordLable')
      )
      expect(userPasswordField.value).toBe(testUserPassword)
   })

   it('should render given error message', () => {
      const errorMessage = {
         userNameErrorMessage: i18n.t('auth:userNameErrorMessage'),
         userPasswordErrorMessage: ''
      }
      const errorProps = { ...props, errorMessage }
      const { getByText } = render(<LogInForm {...errorProps} />)
      getByText(i18n.t('auth:userNameErrorMessage'))
   })
})
