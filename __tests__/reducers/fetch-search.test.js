import { FETCH_SEARCH_REQUEST, FETCH_SEARCH_SUCCESS, FETCH_SEARCH_ERROR } from '../../src/scripts/actions/fetch-search'
import { LOADMORE_SEARCH_REQUEST, LOADMORE_SEARCH_SUCCESS, LOADMORE_SEARCH_ERROR } from '../../src/scripts/actions/loadmore-search'
import fetchSearchReducer from '../../src/scripts/reducers/fetch-search'

describe('Fetch Search Reducer', () => {
  const setup = (defaultState = { isFetching: true, videos: [] }) => {
    return {
      defaultState
    }
  }
  
  it('returns initial state handling with unknown type', () => {
    const { defaultState } = setup()
    expect(fetchSearchReducer(undefined, {})).toEqual(defaultState)
  })

  it('returns state of `FETCH_SEARCH_REQUEST` type action', () => {
    const { defaultState } = setup()
    const expectedState = {
      isFetching: true,
      videos: [],
      query: 'abc'
    }

    const expectedAction = {
      type: FETCH_SEARCH_REQUEST,
      payload: {
        isFetching: true,
        query: 'abc'
      }
    }

    expect(fetchSearchReducer(defaultState, expectedAction)).toEqual(expectedState)
  })

  it('returns state of `FETCH_SEARCH_SUCCESS` type action', () => {
    const { defaultState } = setup()
    const expectedState = {
      isFetching: false,
      videos: [
        {
          id: 'xyz',
          title: 'Video Title',
          channelTitle: 'Channel Title'
        }
      ],
      nextPageToken: 'abcxy23'
    }

    const expectedAction = {
      type: FETCH_SEARCH_SUCCESS,
      payload: {
        isFetching: false,
        videos: [
          {
            id: 'xyz',
            title: 'Video Title',
            channelTitle: 'Channel Title'
          }
        ],
        nextPageToken: 'abcxy23'
      }
    }

    expect(fetchSearchReducer(defaultState, expectedAction)).toEqual(expectedState)
  })

  it('returns state of `FETCH_SEARCH_ERROR` type action', () => {
    const { defaultState } = setup()
    const expectedState = {
      isFetching: false,
      videos: [],
      error: {
        message: 'Error',
      }
    }

    const expectedAction = {
      type: FETCH_SEARCH_ERROR,
      payload: {
        isFetching: false,
        error: {
          message: 'Error',
        }
      }
    }

    expect(fetchSearchReducer(defaultState, expectedAction)).toEqual(expectedState)
  })

  describe('Loadmore actions', () => {
    const loadmoreDefaultState = {
      isFetching: false,
      videos: [
        {
          id: 'xyz',
          title: 'Video Title',
          channelTitle: 'Channel Title'
        }
      ],
      query: 'abc',
      nextPageToken: 'abcxy23'
    }
    const loadmoreSetup = setup(loadmoreDefaultState)
  
    it('returns state of `LOADMORE_SEARCH_REQUEST` type action', () => {
      const { defaultState } = loadmoreSetup

      const expectedAction = {
        type: LOADMORE_SEARCH_REQUEST,
        payload: {
          isFetching: true,
          query: loadmoreDefaultState.query
        }
      }

      const expectedState = {
        ...loadmoreDefaultState,
        ...expectedAction.payload
      }

      expect(fetchSearchReducer(defaultState, expectedAction)).toEqual(expectedState)
    })

    it('returns state of `LOADMORE_SEARCH_SUCCESS` type action', () => {
      const { defaultState } = loadmoreSetup

      const expectedAction = {
        type: LOADMORE_SEARCH_SUCCESS,
        payload: {
          isFetching: false,
          videos: [
            {
              id: 'xyz',
              title: 'Video Title',
              channelTitle: 'Channel Title'
            }
          ],
          query: loadmoreDefaultState.query,
          nextPageToken: loadmoreDefaultState.nextPageToken
        }
      }
      
      const expectedState = {
        ...loadmoreDefaultState,
        videos: [
          ...loadmoreDefaultState.videos,
          {
            id: 'xyz',
            title: 'Video Title',
            channelTitle: 'Channel Title'
          }
        ]
      }

      expect(fetchSearchReducer(defaultState, expectedAction)).toEqual(expectedState)
    })

    it('returns state of `LOADMORE_SEARCH_ERROR` type action', () => {
      const { defaultState } = loadmoreSetup

      const expectedAction = {
        type: LOADMORE_SEARCH_ERROR,
        payload: {
          isFetching: false,
          error: {
            message: 'Error'
          }
        }
      }

      const expectedState = {
        ...loadmoreDefaultState,
        ...expectedAction.payload
      }

      expect(fetchSearchReducer(defaultState, expectedAction)).toEqual(expectedState)
    })
  })
})