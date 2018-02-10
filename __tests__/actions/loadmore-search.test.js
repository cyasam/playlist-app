import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { filterVideoResult } from '../../src/scripts/helpers'
import loadmoreSearch, { loadmoreSearchRequestAction, loadmoreSearchSuccessAction, loadmoreSearchErrorAction, 
LOADMORE_SEARCH_REQUEST, LOADMORE_SEARCH_SUCCESS, LOADMORE_SEARCH_ERROR } from '../../src/scripts/actions/loadmore-search'
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

describe('Loadmore Search Action', () => {
  const successResponse = filterVideoResult(manipulateResult(successResponseJson))
  const setup = () => {
    mock.reset()

    const defaultState = { isFetching: true, videos: [] }
    const store = createMockStore({ search: defaultState })

    const value = 'youtube'
    const expectedAction = {
      request: {
        type: LOADMORE_SEARCH_REQUEST,
        payload: {
          isFetching: true,
          query: 'youtube'
        }
      },
      success: {
        type: LOADMORE_SEARCH_SUCCESS,
        payload: {
          isFetching: false,
          ...successResponse,
          query: 'youtube',
          error: null
        }
      },
      error: {
        type: LOADMORE_SEARCH_ERROR,
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
  
  it('return `LOADMORE_SEARCH_REQUEST` type action', () => {
    const { expectedAction } = setup()
    expect(loadmoreSearchRequestAction(mockAxiosConfig.params.q)).toEqual(expectedAction.request)
  })

  it('return `LOADMORE_SEARCH_SUCCESS` type action', () => {
    const { expectedAction } = setup()
    expect(loadmoreSearchSuccessAction(expectedAction.success.payload, mockAxiosConfig.params.q)).toEqual(expectedAction.success)
  })

  it('return `LOADMORE_SEARCH_ERROR` type action', () => {
    const { expectedAction } = setup()
    expect(loadmoreSearchErrorAction(expectedAction.error.payload.error, mockAxiosConfig.params.q)).toEqual(expectedAction.error)
  })

  it('creates search request and get result successfully', () => {
    const { expectedAction, value, store } = setup()
    mock.onGet(mockAxiosUrl, mockAxiosConfig).reply(config => {
      successResponseJson.items.forEach(item => {
        const mockAxiosVideoUrl = 'https://www.googleapis.com/youtube/v3/videos'
        const mockAxiosVideoConfig = {
          params: {
            part: 'snippet,statistics',
            id: item.id.videoId,
            key: YOUTUBE_API_KEY
          }
        }
        mock.onGet(mockAxiosVideoUrl, mockAxiosVideoConfig).reply(config => {
          return [200, successVideoResponse]
        });
      })
      
      return [200, successResponseJson]
    });

    return store.dispatch(loadmoreSearch(value)).then(() => {
      const receivedAction = store.getActions();

      expect(receivedAction[0]).toEqual(loadmoreSearchRequestAction(mockAxiosConfig.params.q))
      expect(receivedAction[1]).toEqual(loadmoreSearchSuccessAction(successResponse, mockAxiosConfig.params.q))
    })
  })

  it('creates search request and returns error', () => {
    const { expectedAction, value, store } = setup()
    mock.onGet(mockAxiosUrl, mockAxiosConfig).reply(400, errorResponse);

    return store.dispatch(loadmoreSearch(value)).catch(() => {
        const receivedAction = store.getActions();

        expect(receivedAction[0]).toEqual(loadmoreSearchRequestAction(mockAxiosConfig.params.q))
        expect(receivedAction[1]).toEqual(loadmoreSearchErrorAction(expectedAction.error.payload.error, mockAxiosConfig.params.q))
      }
    )
  })
})