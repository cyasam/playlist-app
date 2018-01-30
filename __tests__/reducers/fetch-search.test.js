import { FETCH_SEARCH_REQUEST, FETCH_SEARCH_SUCCESS, FETCH_SEARCH_ERROR } from '../../src/scripts/actions/fetch-search'
import fetchSearchReducer from '../../src/scripts/reducers/fetch-search'

describe('Fetch Search Reducer', () => {
  const defaultState = { isFetching: true, videos: [] }
  
  it('returns initial state handling with unknown type', () => {
    expect(fetchSearchReducer(undefined, {})).toEqual(defaultState)
  })

  it('returns state of `FETCH_SEARCH_REQUEST` type action', () => {
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
    const expectedState = {
      isFetching: false,
      error: {
        message: 'Error',
      },
      videos: []
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
})