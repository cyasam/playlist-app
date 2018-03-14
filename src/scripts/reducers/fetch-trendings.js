import { FETCH_TRENDINGS_REQUEST, FETCH_TRENDINGS_SUCCESS, FETCH_TRENDINGS_ERROR } from '../actions/fetch-trendings'

export const INITIAL_STATE = { isFetching: true, videos: [] }

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_TRENDINGS_REQUEST:
      return { ...state, ...action.payload }
    case FETCH_TRENDINGS_SUCCESS:
      return { ...state, ...action.payload }
    case FETCH_TRENDINGS_ERROR:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
