import { filterVideoResult } from '../helpers'
import { AxiosYoutubeSearch, getVideoDetails } from '../helpers/async-promises'

export const LOADMORE_SEARCH_REQUEST = 'LOADMORE_SEARCH_REQUEST'
export const LOADMORE_SEARCH_SUCCESS = 'LOADMORE_SEARCH_SUCCESS'
export const LOADMORE_SEARCH_ERROR = 'LOADMORE_SEARCH_ERROR'

export default (value, pageToken) => {
  return dispatch => {
    dispatch(loadmoreSearchRequestAction(value))

    const promise = new AxiosYoutubeSearch(value, pageToken)

    return promise.get().then(
      response => {
        return getVideoDetails(response.data)
      }
    ).then(
      response => {
        dispatch(loadmoreSearchSuccessAction(filterVideoResult(response), value))
      }
    ).catch(
      error => {
        dispatch(loadmoreSearchErrorAction(error.message, value))
        throw error
      }
    )
  }
}

export const loadmoreSearchRequestAction = (value) => (
  {
    type: LOADMORE_SEARCH_REQUEST,
    payload: {
      isFetching: true,
      query: value
    }
  }
)

export const loadmoreSearchSuccessAction = (response, value) => (
  {
    type: LOADMORE_SEARCH_SUCCESS,
    payload: {
      isFetching: false,
      ...response,
      query: value,
      error: null
    }
  }
)

export const loadmoreSearchErrorAction = (error, value) => (
  {
    type: LOADMORE_SEARCH_ERROR,
    payload: {
      isFetching: false,
      error,
      query: value
    }
  }
)
