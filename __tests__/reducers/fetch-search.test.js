import { FETCH_SEARCH_REQUEST, FETCH_SEARCH_SUCCESS, FETCH_SEARCH_ERROR } from '../../src/scripts/actions/fetch-search'
import fetchSearchReducer from '../../src/scripts/reducers/fetch-search'
import { successResponse } from '../mockData/youtube-search.js'

describe('Fetch Search Reducer', () => {
  it('returns initial state handling with unknown type', () => {
    const expectedState = {}
    expect(fetchSearchReducer(undefined, {})).toEqual(expectedState)
  })

  it('returns state of `FETCH_SEARCH_REQUEST` type action', () => {
    const expectedState = {
      isFetching: true
    }

    const expectedAction = {
      type: FETCH_SEARCH_REQUEST,
      payload: {
        isFetching: true
      }
    }

    expect(fetchSearchReducer({}, expectedAction)).toEqual(expectedState)
  })

  it('returns state of `FETCH_SEARCH_SUCCESS` type action', () => {
    const expectedState = {
      isFetching: false,
      payload: successResponse
    }

    const expectedAction = {
      type: FETCH_SEARCH_SUCCESS,
      payload: {
        isFetching: false,
        payload: successResponse
      }
    }

    expect(fetchSearchReducer({}, expectedAction)).toEqual(expectedState)
  })

  it('returns state of `FETCH_SEARCH_ERROR` type action', () => {
    const expectedState = {
      isFetching: false,
      payload: {
        error: {
          message: 'Error',
        }
      }
    }

    const expectedAction = {
      type: FETCH_SEARCH_ERROR,
      payload: {
        isFetching: false,
        payload: {
          error: {
            message: 'Error',
          }
        }
      }
    }

    expect(fetchSearchReducer({}, expectedAction)).toEqual(expectedState)
  })
})