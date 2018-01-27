import { FETCH_TRENDINGS_REQUEST, FETCH_TRENDINGS_SUCCESS, FETCH_TRENDINGS_ERROR } from '../actions/fetch-trendings'

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_TRENDINGS_REQUEST:
      return { ...action.payload }
    case FETCH_TRENDINGS_SUCCESS:
      return { ...action.payload }
    case FETCH_TRENDINGS_ERROR:
      return { ...action.payload }
    default:
      return state
  }
}
