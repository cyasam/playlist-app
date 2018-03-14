import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { filterVideoDetailResult } from '../../src/scripts/helpers'
import fetchVideoDetail, { fetchVideoDetailRequestAction, fetchVideoDetailSuccessAction, fetchVideoDetailErrorAction,
  FETCH_VIDEO_DETAIL_REQUEST, FETCH_VIDEO_DETAIL_SUCCESS, FETCH_VIDEO_DETAIL_ERROR } from '../../src/scripts/actions/fetch-video-detail'

import { youtubeApiKey } from '../../src/scripts/config'
import successResponseJson from '../mockData/youtube-video-detail.js'

const mock = new MockAdapter(axios)
const createMockStore = configureMockStore([thunk])

describe('Fetch Video Detail action', () => {
  const setup = () => {
    const mockAxiosUrl = 'https://www.googleapis.com/youtube/v3/videos'
    const mockAxiosConfig = {
      params: {
        part: 'snippet,statistics,contentDetails',
        id: 'oiKj0Z_Xnjc',
        key: youtubeApiKey
      }
    }
    const successResponse = filterVideoDetailResult(successResponseJson)
    const errorResponse = 'Request failed with status code 400'
    const expectedAction = {
      request: {
        type: FETCH_VIDEO_DETAIL_REQUEST,
        payload: {
          isFetching: true,
          video: {}
        }
      },
      success: {
        type: FETCH_VIDEO_DETAIL_SUCCESS,
        payload: {
          isFetching: false,
          video: successResponse,
          error: null
        }
      },
      error: {
        type: FETCH_VIDEO_DETAIL_ERROR,
        payload: {
          isFetching: false,
          error: errorResponse
        }
      }
    }

    const defaultState = { isFetching: true, video: {} }
    const store = createMockStore({ videoDetail: defaultState })
    return {
      store,
      mockAxiosUrl,
      mockAxiosConfig,
      successResponse,
      errorResponse,
      expectedAction
    }
  }

  afterEach(() => {
    mock.reset()
  })

  it('return `FETCH_VIDEO_DETAIL_REQUEST` type action', () => {
    const { expectedAction } = setup()
    expect(fetchVideoDetailRequestAction()).toEqual(expectedAction.request)
  })

  it('return `FETCH_VIDEO_DETAIL_SUCCESS` type action', () => {
    const { expectedAction, successResponse } = setup()
    expect(fetchVideoDetailSuccessAction(successResponse)).toEqual(expectedAction.success)
  })

  it('return `FETCH_VIDEO_DETAIL_ERROR` type action', () => {
    const { expectedAction, errorResponse } = setup()
    expect(fetchVideoDetailErrorAction(errorResponse)).toEqual(expectedAction.error)
  })

  it('creates videoDetail request and get result successfully', () => {
    const { store, mockAxiosUrl, mockAxiosConfig, successResponse } = setup()
    mock.onGet(mockAxiosUrl, mockAxiosConfig).reply(200, successResponseJson)

    return store.dispatch(fetchVideoDetail(mockAxiosConfig.params.id)).then(
      () => {
        const receivedAction = store.getActions()
        expect(receivedAction[0]).toEqual(fetchVideoDetailRequestAction())
        expect(receivedAction[1]).toEqual(fetchVideoDetailSuccessAction(successResponse))
      }
    )
  })

  it('creates videoDetail request and returns error', () => {
    const { store, mockAxiosUrl, mockAxiosConfig, expectedAction, errorResponse } = setup()
    mock.onGet(mockAxiosUrl, mockAxiosConfig).reply(400, errorResponse)

    return store.dispatch(fetchVideoDetail(mockAxiosConfig.params.id)).catch(
      () => {
        const receivedAction = store.getActions()

        expect(receivedAction[0]).toEqual(fetchVideoDetailRequestAction())
        expect(receivedAction[1]).toEqual(fetchVideoDetailErrorAction(expectedAction.error.payload.error))
      }
    )
  })
})
