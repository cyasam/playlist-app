import { filterVideoResult } from '../helpers'
import { axiosYoutubeMostPopular } from '../helpers/async-promises'

export const FETCH_TRENDINGS_REQUEST = 'FETCH_TRENDINGS_REQUEST'
export const FETCH_TRENDINGS_SUCCESS = 'FETCH_TRENDINGS_SUCCESS'
export const FETCH_TRENDINGS_ERROR = 'FETCH_TRENDINGS_ERROR'

export default () => {
  return dispatch => {
    dispatch(fetchTrendingsRequestAction())

    const promise = axiosYoutubeMostPopular()

    return promise.then(
      response => {
        dispatch(fetchTrendingsSuccessAction(filterVideoResult(response.data)))
      }
    ).catch(
      error => {
        dispatch(fetchTrendingsErrorAction(error.message))
        throw error
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
      ...response,
      error: null
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
