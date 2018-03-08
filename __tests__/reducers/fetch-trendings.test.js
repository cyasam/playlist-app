import { FETCH_TRENDINGS_REQUEST, FETCH_TRENDINGS_SUCCESS, FETCH_TRENDINGS_ERROR } from '../../src/scripts/actions/fetch-trendings'
import fetchTrendingsReducer from '../../src/scripts/reducers/fetch-trendings'

describe('Fetch Trendings Reducer', () => {
  const defaultState = { isFetching: true, videos: [] }

  it('returns initial state handling with unknown type', () => {
    expect(fetchTrendingsReducer(undefined, {})).toEqual(defaultState)
  })

  it('returns state of `FETCH_TRENDINGS_REQUEST` type action', () => {
    const expectedState = {
      isFetching: true,
      videos: []
    }

    const expectedAction = {
      type: FETCH_TRENDINGS_REQUEST,
      payload: {
        isFetching: true
      }
    }

    expect(fetchTrendingsReducer(defaultState, expectedAction)).toEqual(expectedState)
  })

  it('returns state of `FETCH_TRENDINGS_SUCCESS` type action', () => {
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
      type: FETCH_TRENDINGS_SUCCESS,
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

    expect(fetchTrendingsReducer(defaultState, expectedAction)).toEqual(expectedState)
  })

  it('returns state of `FETCH_TRENDINGS_ERROR` type action', () => {
    const expectedState = {
      isFetching: false,
      videos: [],
      error: {
        message: 'Error'
      }
    }

    const expectedAction = {
      type: FETCH_TRENDINGS_ERROR,
      payload: {
        isFetching: false,
        error: {
          message: 'Error'
        }
      }
    }

    expect(fetchTrendingsReducer(defaultState, expectedAction)).toEqual(expectedState)
  })
})
