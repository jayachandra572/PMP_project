import {
   API_SUCCESS,
   API_FAILED,
   API_FETCHING,
   API_INITIAL
} from '@ib/api-constants'

import { waitFor } from '@testing-library/react'

import ApiCallModel from '.'

let apiCallModel:ApiCallModel
const requestObject = {}

describe('ApiCallModel test cases', () => {
   beforeEach(() => {
      const apiCallFunction = () => {}
      apiCallModel = new ApiCallModel(apiCallFunction)
   })

   it('should test intialisation', () => {
      expect(apiCallModel.getApiStatus).toBe(API_INITIAL)
      expect(apiCallModel.getApiError).toBe(null)
   })

   it('Should test ApiCall fecting status', () => {
      const mockFetchingPromise:Promise<any> = new Promise((resolve, reject) => {})
      let mockApiCallFunction = jest.fn()
      mockApiCallFunction.mockReturnValue(mockFetchingPromise)
      apiCallModel.apiCallFunction = mockApiCallFunction
      apiCallModel.apiCall(requestObject)
      expect(apiCallModel.getApiStatus).toBe(API_FETCHING)
   })
   it('Should test ApiCall Success status', async () => {
      const responseData = [
         { id: '1', name: 'management' },
         { id: 2, name: 'software' }
      ]
      const mockFetchingPromise:Promise<Array<object>> = new Promise((resolve):void => {
         resolve(responseData)
      })
      let mockApiCallFunction = jest.fn()
      mockApiCallFunction.mockReturnValue(mockFetchingPromise)
      apiCallModel.apiCallFunction = mockApiCallFunction
      apiCallModel.apiCall(requestObject)
      await waitFor(() => {
         expect(apiCallModel.getApiStatus).toBe(API_SUCCESS)
         expect(apiCallModel.response).toEqual(responseData)
      })
   })

   it('Should test ApiCall Success status', async () => {
      const mockError = 'Error'
      const mockFailurePromise:Promise<object> = new Promise((_, reject) => {
         reject (new Error(mockError))
      })
      let mockApiCallFunction = jest.fn()
      mockApiCallFunction.mockReturnValue(mockFailurePromise)
      apiCallModel.apiCallFunction = mockApiCallFunction
      apiCallModel.apiCall(requestObject)
      await waitFor(() => {
         expect(apiCallModel.getApiStatus).toBe(API_FAILED)
         expect(apiCallModel.getApiError).toEqual(mockError)
      })
   })
})
