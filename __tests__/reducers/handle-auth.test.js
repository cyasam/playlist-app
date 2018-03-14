import { AUTH_LOADING, AUTH_SUCCESS, AUTH_FAILED } from '../../src/scripts/actions/handle-auth'
import handleAuthReducer, { INITIAL_STATE } from '../../src/scripts/reducers/handle-auth'

describe('Fetch Trendings Reducer', () => {
  const defaultState = INITIAL_STATE

  it('returns initial state handling with unknown type', () => {
    expect(handleAuthReducer(undefined, {})).toEqual(defaultState)
  })

  it('returns state of `AUTH_LOADING` type action', () => {
    const expectedAction = {
      type: AUTH_LOADING
    }

    const expectedState = { ...defaultState, loading: true }

    expect(handleAuthReducer(defaultState, expectedAction)).toEqual(expectedState)
  })

  it('returns state of `AUTH_SUCCESS` type action', () => {
    const expectedAction = {
      type: AUTH_SUCCESS,
      payload: { user: 'abc' }
    }

    const expectedState = { ...defaultState, loading: false, auth: expectedAction.payload, error: '' }

    expect(handleAuthReducer(defaultState, expectedAction)).toEqual(expectedState)
  })

  it('returns state of `AUTH_FAILED` type action', () => {
    const expectedAction = {
      type: AUTH_FAILED,
      payload: 'Error'
    }

    const expectedState = { ...defaultState, loading: false, auth: null, error: expectedAction.payload }

    expect(handleAuthReducer(defaultState, expectedAction)).toEqual(expectedState)
  })
})
