import {
   API_SUCCESS,
   API_FAILED,
   API_FETCHING,
   API_INITIAL
} from '@ib/api-constants'
import AuthService from '../../services/AuthService/index.fixtures'
import UserDetailsStore from '.'

describe('UserDetailsStore test cases', () => {
   let userDetailsStore
   let authService
   beforeEach(() => {
      authService = new AuthService()
      userDetailsStore = new UserDetailsStore(authService)
   })

   it('should test intialisation of UserDetailsStore', () => {
      expect(userDetailsStore.getUserDetailsApiStatus).toBe(API_INITIAL)
      expect(userDetailsStore.getUserDetailsApiError).toBe(null)
   })

   it('Should test userDetails fecting status', () => {
      const mockFetchingPromise = new Promise(() => {})
      let mockGetUserDetails = jest.fn()
      mockGetUserDetails.mockReturnValue(mockFetchingPromise)
      authService.getUserDetails = mockGetUserDetails
      userDetailsStore.getUserDetailsApi()
      expect(userDetailsStore.getUserDetailsApiStatus).toBe(API_FETCHING)
   })

   it('Should test userDetails Failure status', async () => {
      const mockFailurePromise = new Promise((_, reject) => {
         reject(new Error('Error'))
      })
      let mockGetUserDetails = jest.fn()
      mockGetUserDetails.mockReturnValue(mockFailurePromise)
      authService.getUserDetails = mockGetUserDetails
      await userDetailsStore.getUserDetailsApi()
      expect(userDetailsStore.getUserDetailsApiStatus).toBe(API_FAILED)
   })

   it('Should test userDetails Success status', async () => {
      const mockSuccessPromise = new Promise(resolve => {
         resolve({})
      })
      let mockGetUserDetails = jest.fn()
      mockGetUserDetails.mockReturnValue(mockSuccessPromise)
      authService.getUserDetails = mockGetUserDetails
      await userDetailsStore.getUserDetailsApi()
      expect(userDetailsStore.getUserDetailsApiStatus).toBe(API_SUCCESS)
   })
})
