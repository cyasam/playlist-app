import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import fetchSearch, { filterVideoResult, fetchSearchRequestAction, fetchSearchSuccessAction, fetchSearchErrorAction, 
  FETCH_SEARCH_REQUEST, FETCH_SEARCH_SUCCESS, FETCH_SEARCH_ERROR } from '../../src/scripts/actions/fetch-search'

import { YOUTUBE_API_KEY } from '../../src/scripts/config'
import successResponse from '../mockData/youtube-search.js'

const errorResponse = 'Request failed with status code 400'

const createMockStore = configureMockStore([thunk])

const mock = new MockAdapter(axios)
const mockAxiosUrl = 'https://www.googleapis.com/youtube/v3/search'
const mockAxiosConfig = {
  params: {
    part: 'snippet',
    q: 'surfing',
    type: 'video',
    key: YOUTUBE_API_KEY
  }
}

describe('Fetch Search Action', () => {
  const value = 'surfing'
  const expectedAction = {
    request: {
      type: FETCH_SEARCH_REQUEST,
      payload: {
        isFetching: true
      }
    },
    success: {
      type: FETCH_SEARCH_SUCCESS,
      payload: {
        isFetching: false,
        response: filterVideoResult(successResponse)
      }
    },
    error: {
      type: FETCH_SEARCH_ERROR,
      payload: {
        isFetching: false,
        error: errorResponse
      }
    }
  }

  let store
  
  beforeEach(() => {
    store = createMockStore({ search: {} })
  })

  afterEach (() => {
    mock.reset()
  })
  
  it('return `FETCH_SEARCH_REQUEST` type action', () => {
    expect(fetchSearchRequestAction()).toEqual(expectedAction.request)
  })

  it('return `FETCH_SEARCH_SUCCESS` type action', () => {
    expect(fetchSearchSuccessAction(expectedAction.success.payload.response)).toEqual(expectedAction.success)
  })

  it('return `FETCH_SEARCH_ERROR` type action', () => {
    expect(fetchSearchErrorAction(expectedAction.error.payload.error)).toEqual(expectedAction.error)
  })

  it('creates search request and get result successfully', () => {

    mock.onGet(mockAxiosUrl, mockAxiosConfig).reply(200, successResponse);

    return store.dispatch(fetchSearch(value)).then(
      () => {
        const receivedAction = store.getActions();
        expect(receivedAction[0]).toEqual(fetchSearchRequestAction(expectedAction.request.payload))
        expect(receivedAction[1]).toEqual(fetchSearchSuccessAction(expectedAction.success.payload.response))
      }
    )
  })

  it('creates search request and returns error', () => {
    
    mock.onGet(mockAxiosUrl, mockAxiosConfig).reply(400, errorResponse);

    return store.dispatch(fetchSearch(value)).then(
      () => {
        const receivedAction = store.getActions();

        expect(receivedAction[0]).toEqual(fetchSearchRequestAction(expectedAction.request.payload))
        expect(receivedAction[1]).toEqual(fetchSearchErrorAction(expectedAction.error.payload.error))
      }
    )
  })
})