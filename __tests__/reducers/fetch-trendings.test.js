import { FETCH_TRENDINGS_REQUEST, FETCH_TRENDINGS_SUCCESS, FETCH_TRENDINGS_ERROR } from '../../src/scripts/actions/fetch-trendings'
import fetchTrendingsReducer from '../../src/scripts/reducers/fetch-trendings'
import { successResponse } from '../mockData/youtube-trendings.js'

describe('Fetch Trendings Reducer', () => {
  it('returns initial state handling with unknown type', () => {
    const expectedState = {}
    expect(fetchTrendingsReducer(undefined, {})).toEqual(expectedState)
  })

  it('returns state of `FETCH_TRENDINGS_REQUEST` type action', () => {
    const expectedState = {
      isFetching: true
    }

    const expectedAction = {
      type: FETCH_TRENDINGS_REQUEST,
      payload: {
        isFetching: true
      }
    }

    expect(fetchTrendingsReducer({}, expectedAction)).toEqual(expectedState)
  })

  it('returns state of `FETCH_TRENDINGS_SUCCESS` type action', () => {
    const expectedState = {
      isFetching: false,
      payload: successResponse
    }

    const expectedAction = {
      type: FETCH_TRENDINGS_SUCCESS,
      payload: {
        isFetching: false,
        payload: successResponse
      }
    }

    expect(fetchTrendingsReducer({}, expectedAction)).toEqual(expectedState)
  })

  it('returns state of `FETCH_TRENDINGS_ERROR` type action', () => {
    const expectedState = {
      isFetching: false,
      payload: {
        error: {
          message: 'Error'
        }
      }
    }

    const expectedAction = {
      type: FETCH_TRENDINGS_ERROR,
      payload: {
        isFetching: false,
        payload: {
          error: {
            message: 'Error'
          }
        }
      }
    }

    expect(fetchTrendingsReducer({}, expectedAction)).toEqual(expectedState)
  })
})