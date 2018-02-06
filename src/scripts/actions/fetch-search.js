import { filterVideoResult } from '../helpers'
import { axiosYoutubeSearch, getVideoDetails } from '../helpers/async-promises'

export const FETCH_SEARCH_REQUEST = 'FETCH_SEARCH_REQUEST'
export const FETCH_SEARCH_SUCCESS = 'FETCH_SEARCH_SUCCESS'
export const FETCH_SEARCH_ERROR = 'FETCH_SEARCH_ERROR'

export default (value) => {
  return dispatch => {
    dispatch(fetchSearchRequestAction(value))

    const promise = axiosYoutubeSearch(value)

    return promise.then(
      response => {
        return getVideoDetails(response.data)
      },
      error => {
        dispatch(fetchSearchErrorAction(error.message, value))
        throw error
      }
    ).then(
      response => {
        dispatch(fetchSearchSuccessAction(filterVideoResult(response), value))
      },
      error => {
        dispatch(fetchSearchErrorAction(error.message, value))
      }
    )
  }
}

export const fetchSearchRequestAction = (value) => (
  {
    type: FETCH_SEARCH_REQUEST,
    payload: {
      isFetching: true,
      videos: [],
      query: value
    }
  }
)

export const fetchSearchSuccessAction = (response, value) => (
  {
    type: FETCH_SEARCH_SUCCESS,
    payload: {
      isFetching: false,
      ...response,
      query: value
    }
  }
)

export const fetchSearchErrorAction = (error, value) => (
  {
    type: FETCH_SEARCH_ERROR,
    payload: {
      isFetching: false,
      error,
      query: value
    }
  }
)
