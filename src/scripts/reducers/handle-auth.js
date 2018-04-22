import { AUTH_LOADING, AUTH_SUCCESS, AUTH_FAILED } from '../actions/handle-auth'

export const INITIAL_STATE = {
  loading: false,
  auth: null,
  error: ''
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_LOADING:
      return { ...INITIAL_STATE, loading: true }
    case AUTH_SUCCESS:
      return { ...INITIAL_STATE, auth: action.payload }
    case AUTH_FAILED:
      return { ...INITIAL_STATE, error: action.payload }
    default:
      return state
  }
}
