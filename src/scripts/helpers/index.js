import { appTitle } from '../config'

export const setDocumentTitle = title => {
  return title ? `${title} - ${appTitle}` : appTitle
}

export const filterVideoResult = result => {
  const videos = result.items.map(item => {
    return {
      id: item.id,
      title: item.snippet.title,
      duration: item.contentDetails.duration,
      channelTitle: item.snippet.channelTitle,
      statistics: item.statistics,
      publishedAt: item.snippet.publishedAt,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.medium
    }
  })

  return {
    videos,
    nextPageToken: result.nextPageToken
  }
}

export const filterVideoDetailResult = result => {
  const item = result.items[0]

  if (!item) {
    return {}
  }

  return {
    id: item.id,
    title: item.snippet.title,
    channelId: item.snippet.channelId,
    channelTitle: item.snippet.channelTitle,
    statistics: item.statistics,
    publishedAt: item.snippet.publishedAt,
    description: item.snippet.description
  }
}

export const shorthenText = (text, maxLength = 100) => {
  return (text && text.length > maxLength) ? `${text.substr(0, maxLength)}...` : text
}

export class ConvertYouTubeDuration {
  constructor (duration) {
    this.hours = 0
    this.minutes = 0
    this.seconds = 0
    this.duration = duration.replace('PT', '')
    this.hoursSplit = ''
    this.minutesSplit = ''
    this.hoursStr = ''
    this.minutesStr = ''
    this.secondsStr = ''
  }

  extractor () {
    const timeExtractor = /([0-9]*H)?([0-9]*M)?([0-9]*S)?$/
    return timeExtractor.exec(this.duration)
  }

  convert () {
    this.hours = this.getHours()
    this.minutes = this.getMinutes()
    this.seconds = this.getSeconds()

    if (this.hours > 0) {
      this.hoursStr = `${this.hours}:`
    }

    if (this.minutes <= 9 && this.minutes >= 0 && this.hours > 0) {
      this.minutesStr = `0${this.minutes}`
    } else {
      this.minutesStr = this.minutes
    }

    if (this.seconds <= 9 && this.seconds >= 0) {
      this.secondsStr = `0${this.seconds}`
    } else {
      this.secondsStr = this.seconds
    }

    return `${this.hoursStr}${this.minutesStr}:${this.secondsStr}`
  }

  getHours () {
    return parseInt(this.extractor()[1], 10) || 0
  }

  getMinutes () {
    return parseInt(this.extractor()[2], 10) || 0
  }

  getSeconds () {
    return parseInt(this.extractor()[3], 10) || 0
  }
}
