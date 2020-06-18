import {
   API_SUCCESS,
   API_FAILED,
   API_FETCHING,
   API_INITIAL
} from '@ib/api-constants'
import Cookie from 'js-cookie'
import AuthService from '../../services/AuthService/index.api'
import AuthServiceApiResponse from '../../fixtures/getUserSignInResponse'
import AuthStore from '.'

let mockSetCookie = jest.fn()
let mockGetCookie = jest.fn()
let mockRemoveCookie = jest.fn()
Cookie.set = mockSetCookie
Cookie.get = mockGetCookie
Cookie.remove = mockRemoveCookie

describe('AuthenticationStore test cases', () => {
   let authStore
   let authService
   let mockOnFailure = jest.fn()
   let mockOnSuccess = jest.fn()
   let mockRequest = {
      userName: 'test-name',
      userPassword: 'test-password'
   }
   beforeEach(() => {
      authService = new AuthService()
      authStore = new AuthStore(authService)
   })

   it('should test intialisation of accessToken', () => {
      expect(mockGetCookie).toBeCalled()
      expect(authStore.getAuthApiStatus).toBe(API_INITIAL)
      expect(authStore.getAuthApiError).toBe(null)
   })

   it('Should test userSignIn fecting status', () => {
      const mockFetchingPromise = new Promise((resolve, reject) => {})
      let mockUserSignInApi = jest.fn()
      mockUserSignInApi.mockReturnValue(mockFetchingPromise)
      authService.signInAPI = mockUserSignInApi
      authStore.userSignIn(mockRequest, mockOnSuccess, mockOnFailure)
      expect(authStore.getAuthApiStatus).toBe(API_FETCHING)
      expect(mockOnSuccess).not.toBeCalled()
      expect(mockOnFailure).not.toBeCalled()
   })

   it('Should test userSignIn success status', async () => {
      const mockSuccessPromise = new Promise((resolve, reject) => {
         resolve(AuthServiceApiResponse)
      })
      const mockUserSignInApi = jest.fn()
      mockUserSignInApi.mockReturnValue(mockSuccessPromise)
      authService.signInAPI = mockUserSignInApi
      await authStore.userSignIn(mockRequest, mockOnSuccess, mockOnFailure)
      expect(authStore.getAuthApiStatus).toBe(API_SUCCESS)
      expect(mockSetCookie).toBeCalled()
      expect(mockGetCookie).toBeCalled()
   })

   it('Should test userSignIn failure status', async () => {
      const mockError = 'Error'
      const mockFailurePromise = new Promise((resolve, reject) => {
         throw new Error(mockError)
      })
      const mockUserSignInApi = jest.fn()
      mockUserSignInApi.mockReturnValue(mockFailurePromise)
      authService.signInAPI = mockUserSignInApi
      await authStore.userSignIn(mockRequest, mockOnFailure)
      expect(authStore.getAuthApiStatus).toBe(API_FAILED)
      expect(mockOnFailure).toBeCalled()
   })

   it('Should test userSignOut function', () => {
      authStore.userLogOut()
      expect(mockRemoveCookie).toBeCalled()
      expect(authStore.getAuthApiStatus).toBe(API_INITIAL)
      expect(authStore.getAuthApiError).toBe(null)
   })
})
