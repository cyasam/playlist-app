import axios from 'axios'
import { YOUTUBE_API_KEY } from '../config'

export const FETCH_SEARCH_REQUEST = 'FETCH_SEARCH_REQUEST'
export const FETCH_SEARCH_SUCCESS = 'FETCH_SEARCH_SUCCESS'
export const FETCH_SEARCH_ERROR = 'FETCH_SEARCH_ERROR'

export default (value) => {
  return dispatch => {
    const axiosUrl = 'https://www.googleapis.com/youtube/v3/search'
    const axiosConfig = {
      params: {
        part: 'snippet',
        q: value,
        type: 'video',
        key: YOUTUBE_API_KEY
      }
    }

    dispatch(fetchSearchRequestAction())

    const promise = axios.get(axiosUrl, axiosConfig)

    return promise.then(
      response => {
        dispatch(fetchSearchSuccessAction(filterVideoResult(response.data)))
      },
      error => {
        dispatch(fetchSearchErrorAction(error.message))
      }
    )
  }
}

export const fetchSearchRequestAction = () => (
  {
    type: FETCH_SEARCH_REQUEST,
    payload: {
      isFetching: true
    }
  }
)

export const fetchSearchSuccessAction = (response) => (
  {
    type: FETCH_SEARCH_SUCCESS,
    payload: {
      isFetching: false,
      response
    }
  }
)

export const fetchSearchErrorAction = (error) => (
  {
    type: FETCH_SEARCH_ERROR,
    payload: {
      isFetching: false,
      error
    }
  }
)

export const filterVideoResult = (result) => {
  return result.items.map(item => {
    return {
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.medium
    }
  })
}
