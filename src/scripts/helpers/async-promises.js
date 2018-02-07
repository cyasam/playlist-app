import axios from 'axios'
import { YOUTUBE_API_KEY } from '../config'

export const axiosYoutubeSearch = (q, pageToken) => {
  const axiosUrl = 'https://www.googleapis.com/youtube/v3/search'
  const axiosConfig = {
    params: {
      part: 'snippet',
      q,
      type: 'video',
      regionCode: 'TR',
      maxResults: 24,
      key: YOUTUBE_API_KEY
    }
  }
  if (pageToken) {
    axiosConfig.params.pageToken = pageToken
  }
  return axios.get(axiosUrl, axiosConfig)
}

export const axiosYoutubeVideoById = (id) => {
  const axiosUrl = 'https://www.googleapis.com/youtube/v3/videos'
  const axiosConfig = {
    params: {
      part: 'statistics',
      id,
      regionCode: 'TR',
      key: YOUTUBE_API_KEY
    }
  }
  return axios.get(axiosUrl, axiosConfig)
}

export const axiosYoutubeMostPopular = () => {
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
  return axios.get(axiosUrl, axiosConfig)
}

export const getVideoDetails = (data) => {
  const promises = []
  const dataClone = { ...data }
  dataClone.items.forEach((item, index) => {
    const promise = axiosYoutubeVideoById(item.id.videoId).then(
      video => {
        return addVideoStatistics(dataClone.items[index], video.data.items[0])
      }
    )

    promises.push(promise)
  })
  const resultPromise = Promise.all(promises)
  return resultPromise.then(
    result => {
      dataClone.items = result
      return dataClone
    }
  )
}

export const addVideoStatistics = (dataItem, item) => {
  const { id, statistics } = item
  dataItem.statistics = statistics
  dataItem.id = id
  return dataItem
}
