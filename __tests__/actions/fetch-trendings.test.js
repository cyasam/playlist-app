import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { filterVideoResult } from '../../src/scripts/helpers'
import fetchTrendings, { fetchTrendingsRequestAction, fetchTrendingsSuccessAction, fetchTrendingsErrorAction, 
  FETCH_TRENDINGS_REQUEST, FETCH_TRENDINGS_SUCCESS, FETCH_TRENDINGS_ERROR } from '../../src/scripts/actions/fetch-trendings'

import { YOUTUBE_API_KEY } from '../../src/scripts/config'
import successResponse from '../mockData/youtube-trendings.js'

const errorResponse = 'Request failed with status code 400'

const createMockStore = configureMockStore([thunk])

const mock = new MockAdapter(axios)
const mockAxiosUrl = 'https://www.googleapis.com/youtube/v3/videos'
const mockAxiosConfig = {
  params: {
    part: 'snippet,contentDetails,statistics',
    chart: 'mostPopular',
    maxResults: 24,
    key: YOUTUBE_API_KEY
  }
}

describe('Fetch Trendings Action', () => {
  const expectedAction = {
    request: {
      type: FETCH_TRENDINGS_REQUEST,
      payload: {
        isFetching: true
      }
    },
    success: {
      type: FETCH_TRENDINGS_SUCCESS,
      payload: {
        isFetching: false,
        response: filterVideoResult(successResponse)
      }
    },
    error: {
      type: FETCH_TRENDINGS_ERROR,
      payload: {
        isFetching: false,
        error: errorResponse
      }
    }
  }

  let store
  
  beforeEach(() => {
    store = createMockStore({ trendings: {} })
  })

  afterEach (() => {
    mock.reset()
  })
  
  it('return `FETCH_TRENDINGS_REQUEST` type action', () => {
    expect(fetchTrendingsRequestAction()).toEqual(expectedAction.request)
  })

  it('return `FETCH_TRENDINGS_SUCCESS` type action', () => {
    expect(fetchTrendingsSuccessAction(expectedAction.success.payload.response)).toEqual(expectedAction.success)
  })

  it('return `FETCH_TRENDINGS_ERROR` type action', () => {
    expect(fetchTrendingsErrorAction(expectedAction.error.payload.error)).toEqual(expectedAction.error)
  })

  it('creates trendings request and get result successfully', () => {

    mock.onGet(mockAxiosUrl, mockAxiosConfig).reply(200, successResponse);

    return store.dispatch(fetchTrendings()).then(
      () => {
        const receivedAction = store.getActions();
        expect(receivedAction[0]).toEqual(fetchTrendingsRequestAction())
        expect(receivedAction[1]).toEqual(fetchTrendingsSuccessAction(expectedAction.success.payload.response))
      }
    )
  })

  it('creates trendings request and returns error', () => {
    
    mock.onGet(mockAxiosUrl, mockAxiosConfig).reply(400, errorResponse);

    return store.dispatch(fetchTrendings()).then(
      () => {
        const receivedAction = store.getActions();

        expect(receivedAction[0]).toEqual(fetchTrendingsRequestAction())
        expect(receivedAction[1]).toEqual(fetchTrendingsErrorAction(expectedAction.error.payload.error))
      }
    )
  })
})