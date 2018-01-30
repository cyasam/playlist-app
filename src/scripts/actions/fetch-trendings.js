import axios from 'axios'
import { YOUTUBE_API_KEY } from '../config'
import { filterVideoResult } from '../helpers'

export const FETCH_TRENDINGS_REQUEST = 'FETCH_TRENDINGS_REQUEST'
export const FETCH_TRENDINGS_SUCCESS = 'FETCH_TRENDINGS_SUCCESS'
export const FETCH_TRENDINGS_ERROR = 'FETCH_TRENDINGS_ERROR'

export default (pageToken = null) => {
  return dispatch => {
    const axiosUrl = 'https://www.googleapis.com/youtube/v3/videos'
    const axiosConfig = {
      params: {
        part: 'snippet,contentDetails,statistics',
        chart: 'mostPopular',
        regionCode: 'TR',
        maxResults: 24,
        key: YOUTUBE_API_KEY
      }
    }

    if (pageToken) {
      axiosConfig.params.pageToken = pageToken
    }

    dispatch(fetchTrendingsRequestAction())

    const promise = axios.get(axiosUrl, axiosConfig)

    return promise.then(
      response => {
        dispatch(fetchTrendingsSuccessAction(filterVideoResult(response.data)))
      },
      error => {
        dispatch(fetchTrendingsErrorAction(error.message))
      }
    )
  }
}

export const fetchTrendingsRequestAction = () => (
  {
    type: FETCH_TRENDINGS_REQUEST,
    payload: {
      isFetching: true
    }
  }
)

export const fetchTrendingsSuccessAction = (response) => (
  {
    type: FETCH_TRENDINGS_SUCCESS,
    payload: {
      isFetching: false,
      ...response
    }
  }
)

export const fetchTrendingsErrorAction = (error) => (
  {
    type: FETCH_TRENDINGS_ERROR,
    payload: {
      isFetching: false,
      error
    }
  }
)
