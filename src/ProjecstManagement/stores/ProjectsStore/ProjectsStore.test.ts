import {
   API_SUCCESS,
   API_FAILED,
   API_FETCHING,
   API_INITIAL
} from '@ib/api-constants'

import { waitFor } from '@testing-library/react'

import ProjectsService from '../../services/ProjectsService/index.api'
import PageNavigationStore from '../PageNavigationStore'
import ProjectsStore from '.'

describe('ProjectsStore test cases', () => {
   let projectsStore:ProjectsStore
   let projectsService:ProjectsService

   beforeEach(() => {
      projectsService = new ProjectsService()
      projectsStore = new ProjectsStore(projectsService, PageNavigationStore)
   })

   it('should test intialisation', () => {
      expect(projectsStore.pageNavigation).not.toBe(null)
      expect(projectsStore.pageNavigation.getApiStatus).toBe(API_INITIAL)
      expect(projectsStore.pageNavigation.getApiError).toBe(null)
   })
})
