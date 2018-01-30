import { FETCH_SEARCH_REQUEST, FETCH_SEARCH_SUCCESS, FETCH_SEARCH_ERROR } from '../actions/fetch-search'

export default (state = { isFetching: true, videos: [] }, action) => {
  switch (action.type) {
    case FETCH_SEARCH_REQUEST:
      return { ...state, ...action.payload }
    case FETCH_SEARCH_SUCCESS:
      const allVideos = state.videos.concat(action.payload.videos)
      return { ...state, ...action.payload, videos: allVideos }
    case FETCH_SEARCH_ERROR:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
