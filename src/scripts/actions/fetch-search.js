import axios from 'axios'
import { YOUTUBE_API_KEY } from '../config'
import { filterVideoResult } from '../helpers'

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
        regionCode: 'TR',
        maxResults: 24,
        key: YOUTUBE_API_KEY
      }
    }

    dispatch(fetchSearchRequestAction(value))

    const promise = axios.get(axiosUrl, axiosConfig)

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
      query: value
    }
  }
)

export const fetchSearchSuccessAction = (response, value) => (
  {
    type: FETCH_SEARCH_SUCCESS,
    payload: {
      isFetching: false,
      response,
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

export const getVideoDetails = (response) => {
  const axiosVideosUrl = 'https://www.googleapis.com/youtube/v3/videos'
  const axiosVideosConfig = (id) => ({
    params: {
      part: 'statistics',
      id,
      regionCode: 'TR',
      key: YOUTUBE_API_KEY
    }
  })
  const promises = []
  const newItem = { ...response }
  newItem.items.forEach((item, index) => {
    const promise = axios(axiosVideosUrl, axiosVideosConfig(item.id.videoId)).then(
      video => {
        const { id, statistics } = video.data.items[0]
        newItem.items[index].statistics = statistics
        newItem.items[index].id = id
        return newItem.items[index]
      }
    )

    promises.push(promise)
  })
  const resultPromise = Promise.all(promises)
  return resultPromise.then(
    result => {
      newItem.items = result
      return newItem
    }
  )
}
