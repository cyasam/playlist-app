import { FETCH_VIDEO_DETAIL_REQUEST, FETCH_VIDEO_DETAIL_SUCCESS, FETCH_VIDEO_DETAIL_ERROR } from '../actions/fetch-video-detail'

export default (state = { isFetching: true, video: {} }, action) => {
  switch (action.type) {
    case FETCH_VIDEO_DETAIL_REQUEST:
      return { ...state, ...action.payload }
    case FETCH_VIDEO_DETAIL_SUCCESS:
      return { ...state, ...action.payload }
    case FETCH_VIDEO_DETAIL_ERROR:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
