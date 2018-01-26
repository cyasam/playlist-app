import { FETCH_SEARCH_REQUEST, FETCH_SEARCH_SUCCESS, FETCH_SEARCH_ERROR } from '../actions/fetch-search'

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_SEARCH_REQUEST:
      return { ...action.payload }
    case FETCH_SEARCH_SUCCESS:
      return { ...action.payload }
    case FETCH_SEARCH_ERROR:
      return { ...action.payload }
    default:
      return state
  }
}
