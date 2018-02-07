import { filterVideoResult } from '../helpers'
import { AxiosYoutubeSearch, getVideoDetails } from '../helpers/async-promises'

export const FETCH_SEARCH_REQUEST = 'FETCH_SEARCH_REQUEST'
export const FETCH_SEARCH_SUCCESS = 'FETCH_SEARCH_SUCCESS'
export const FETCH_SEARCH_ERROR = 'FETCH_SEARCH_ERROR'

export default (value) => {
  return dispatch => {
    dispatch(fetchSearchRequestAction(value))

    const promise = new AxiosYoutubeSearch(value)

    return promise.get().then(
      response => {
        return getVideoDetails(response.data)
      }
    ).then(
      response => {
        dispatch(fetchSearchSuccessAction(filterVideoResult(response), value))
      }
    ).catch(
      error => {
        dispatch(fetchSearchErrorAction(error.message, value))
        throw error
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
      query: value,
      error: null
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
