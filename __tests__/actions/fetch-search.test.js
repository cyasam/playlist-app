import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { filterVideoResult } from '../../src/scripts/helpers'
import fetchSearch, { fetchSearchRequestAction, fetchSearchSuccessAction, fetchSearchErrorAction, 
FETCH_SEARCH_REQUEST, FETCH_SEARCH_SUCCESS, FETCH_SEARCH_ERROR } from '../../src/scripts/actions/fetch-search'
import { getVideoDetails, addVideoStatistics } from '../../src/scripts/helpers/async-promises'

import { YOUTUBE_API_KEY } from '../../src/scripts/config'
import successResponseJson from '../mockData/youtube-search.js'

const errorResponse = 'Request failed with status code 400'

const createMockStore = configureMockStore([thunk])

const mock = new MockAdapter(axios)
const mockAxiosUrl = 'https://www.googleapis.com/youtube/v3/search'
const mockAxiosConfig = {
  params: {
    part: 'snippet',
    q: 'youtube',
    type: 'video',
    regionCode: 'TR',
    maxResults: 24,
    key: YOUTUBE_API_KEY
  }
}

const successVideoResponse = {
  kind: 'youtube#videoListResponse',
  etag: '"Wu2llbfqCdxIVjGbVPm2DslKPCA/9snSbrGeQ3FASDu6fgFrUJnvpLg"',
  pageInfo: {
    totalResults: 1,
    resultsPerPage: 1
  },
  items: [
    {
      kind: 'youtube#video',
      etag: '"Wu2llbfqCdxIVjGbVPm2DslKPCA/15xGMSiz4CowqfgWYnpcjEE4W_I"',
      id: 'MoylTKIuK1A',
      statistics: {
        viewCount: '1890045',
        likeCount: '2304',
        dislikeCount: '96',
        favoriteCount: '0',
        commentCount: '88'
      }
    }
  ]
}

const manipulateResult = (data) => {
  const newItem = { ...data }
  newItem.items.forEach((item, index) => {
    const { id, statistics } = successVideoResponse.items[0]
    newItem.items[index].statistics = statistics
    newItem.items[index].id = id
  });
  return newItem
}

describe('Fetch Search Action', () => {
  const successResponse = filterVideoResult(manipulateResult(successResponseJson))
  const setup = () => {
    mock.reset()

    const defaultState = { isFetching: true, videos: [] }
    const store = createMockStore({ search: defaultState })

    const value = 'youtube'
    const expectedAction = {
      request: {
        type: FETCH_SEARCH_REQUEST,
        payload: {
          isFetching: true,
          videos: [],
          query: 'youtube'
        }
      },
      success: {
        type: FETCH_SEARCH_SUCCESS,
        payload: {
          isFetching: false,
          ...successResponse,
          query: 'youtube',
          error: null
        }
      },
      error: {
        type: FETCH_SEARCH_ERROR,
        payload: {
          isFetching: false,
          error: errorResponse,
          query: 'youtube'
        }
      }
    }

    return {
      expectedAction,
      value,
      store
    }
  }
  
  it('return `FETCH_SEARCH_REQUEST` type action', () => {
    const { expectedAction } = setup()
    expect(fetchSearchRequestAction(mockAxiosConfig.params.q)).toEqual(expectedAction.request)
  })

  it('return `FETCH_SEARCH_SUCCESS` type action', () => {
    const { expectedAction } = setup()
    expect(fetchSearchSuccessAction(expectedAction.success.payload, mockAxiosConfig.params.q)).toEqual(expectedAction.success)
  })

  it('return `FETCH_SEARCH_ERROR` type action', () => {
    const { expectedAction } = setup()
    expect(fetchSearchErrorAction(expectedAction.error.payload.error, mockAxiosConfig.params.q)).toEqual(expectedAction.error)
  })

  it('creates search request and get result successfully', () => {
    const { expectedAction, value, store } = setup()
    mock.onGet(mockAxiosUrl, mockAxiosConfig).reply(() => {
      successResponseJson.items.forEach(item => {
        const mockAxiosVideoUrl = 'https://www.googleapis.com/youtube/v3/videos'
        const mockAxiosVideoConfig = {
          params: {
            part: 'snippet,statistics',
            id: item.id.videoId,
            key: YOUTUBE_API_KEY
          }
        }
        mock.onGet(mockAxiosVideoUrl, mockAxiosVideoConfig).reply(() => {
          return [200, successVideoResponse]
        });
      })
      
      return [200, successResponseJson]
    });

    return store.dispatch(fetchSearch(value)).then(() => {
      const receivedAction = store.getActions();

      expect(receivedAction[0]).toEqual(fetchSearchRequestAction(mockAxiosConfig.params.q))
      expect(receivedAction[1]).toEqual(fetchSearchSuccessAction(successResponse, mockAxiosConfig.params.q))
    })
  })

  it('creates search request and returns error', () => {
    const { expectedAction, value, store } = setup()
    mock.onGet(mockAxiosUrl, mockAxiosConfig).reply(400, errorResponse);

    return store.dispatch(fetchSearch(value)).catch(() => {
        const receivedAction = store.getActions();

        expect(receivedAction[0]).toEqual(fetchSearchRequestAction(mockAxiosConfig.params.q))
        expect(receivedAction[1]).toEqual(fetchSearchErrorAction(expectedAction.error.payload.error, mockAxiosConfig.params.q))
      }
    )
  })
})