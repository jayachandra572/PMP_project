import React from 'react'
import { render } from '@testing-library/react'
import { API_SUCCESS } from "@ib/api-constants"

import strings from '../../i18n/strings.json'

import { LogInForm } from '.'


const props = {
   userName:"test-user",
   userPassword:"test-password",
   onChangeName:(e:any)=>{},
   onChangePassword:(e:any)=>{},
   onSubmitForm:(e:any)=>{},
   getAuthApiStatus:API_SUCCESS,
}
describe('LogInForm tests', () => {
   it('Should render typed userName', () => {
      const testUserName = 'test-user'
      const { getByLabelText ,getByTestId} = render(
         <LogInForm {...props} />
      )
      const userNameField:any = getByTestId(strings.userNameLable)
      expect(userNameField.value).toBe(testUserName)
   })

   it('Should render typed userPassword', () => {
      const testUserPassword = 'test-password'
      const { getByLabelText } = render(
         <LogInForm
            {...props}
         />
      )
      const userPasswordField:any = getByLabelText(strings.userPasswordLable)
      expect(userPasswordField.value).toBe(testUserPassword)
   })

   it('should render given error message', () => {
      const errorMessage = {
         userNameErrorMessage: strings.userNameErrorMessage,
         userPasswordErrorMessage: ''
      }
      const { getByText } = render(<LogInForm {{...props,errorMessage}} />)
      getByText(strings.userNameErrorMessage)
   })
})
