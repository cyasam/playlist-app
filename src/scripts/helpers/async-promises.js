import axios from 'axios'
import { youtubeApiKey } from '../config'

export class AxiosYoutubeSearch {
  constructor (q = null, pageToken = null) {
    this.q = q
    this.pageToken = pageToken
    this.axiosUrl = 'https://www.googleapis.com/youtube/v3/search'
  }

  get () {
    return axios.get(this.axiosUrl, this.axiosConfig(this.q, this.pageToken))
  }

  axiosConfig () {
    const defaults = {
      params: {
        part: 'snippet',
        q: this.q,
        type: 'video',
        maxResults: 24,
        key: youtubeApiKey
      }
    }
    if (this.pageToken) {
      defaults.params.pageToken = this.pageToken
    }
    return defaults
  }
}

export const axiosYoutubeVideoById = (id) => {
  const axiosUrl = 'https://www.googleapis.com/youtube/v3/videos'
  const axiosConfig = {
    params: {
      part: 'snippet,statistics,contentDetails',
      id,
      key: youtubeApiKey
    }
  }
  return axios.get(axiosUrl, axiosConfig)
}

export const axiosYoutubeMostPopular = () => {
  const axiosUrl = 'https://www.googleapis.com/youtube/v3/videos'
  const axiosConfig = {
    params: {
      part: 'snippet,statistics,contentDetails',
      chart: 'mostPopular',
      maxResults: 24,
      key: youtubeApiKey
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
  const { id, statistics, contentDetails } = item
  dataItem.statistics = statistics
  dataItem.contentDetails = contentDetails
  dataItem.id = id
  return dataItem
}
