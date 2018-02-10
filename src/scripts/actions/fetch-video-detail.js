import { axiosYoutubeVideoById } from '../helpers/async-promises'
import { filterVideoDetailResult } from '../helpers'

export const FETCH_VIDEO_DETAIL_REQUEST = 'FETCH_VIDEO_DETAIL_REQUEST'
export const FETCH_VIDEO_DETAIL_SUCCESS = 'FETCH_VIDEO_DETAIL_SUCCESS'
export const FETCH_VIDEO_DETAIL_ERROR = 'FETCH_VIDEO_DETAIL_ERROR'

export default (videoId) => {
  return dispatch => {
    dispatch(fetchVideoDetailRequestAction())
    const promise = axiosYoutubeVideoById(videoId)

    return promise.then(
      response => {
        dispatch(fetchVideoDetailSuccessAction(filterVideoDetailResult(response.data)))
      }
    ).catch(
      error => {
        dispatch(fetchVideoDetailErrorAction(error.message))
        throw error
      }
    )
  }
}

export const fetchVideoDetailRequestAction = () => (
  {
    type: FETCH_VIDEO_DETAIL_REQUEST,
    payload: {
      isFetching: true,
      video: {}
    }
  }
)

export const fetchVideoDetailSuccessAction = (video) => (
  {
    type: FETCH_VIDEO_DETAIL_SUCCESS,
    payload: {
      isFetching: false,
      video,
      error: null
    }
  }
)

export const fetchVideoDetailErrorAction = (error) => (
  {
    type: FETCH_VIDEO_DETAIL_ERROR,
    payload: {
      isFetching: false,
      error
    }
  }
)
