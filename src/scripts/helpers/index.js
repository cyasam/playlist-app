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

export const convertYouTubeDuration = duration => {
  let hours = 0
  let minutes = 0
  let seconds = 0
  let hoursSplit, minutesSplit, secondsSplit
  let hoursStr = ''
  let minutesStr = ''
  let secondsStr = ''

  duration = duration.replace('PT', '')

  if (duration.indexOf('H') > -1) {
    hoursSplit = duration.split('H')
    hours = parseInt(hoursSplit[0])
    duration = hoursSplit[1]
  }

  if (duration.indexOf('M') > -1) {
    minutesSplit = duration.split('M')
    minutes = parseInt(minutesSplit[0])
    duration = minutesSplit[1]
  }

  if (duration.indexOf('S') > -1) {
    secondsSplit = duration.split('S')
    seconds = parseInt(secondsSplit[0])
  }

  if (hours > 0) {
    hoursStr = `${hours}:`
  }

  if (minutes <= 9 && minutes >= 0 && hours > 0) {
    minutesStr = `0${minutes}`
  } else {
    minutesStr = minutes
  }

  if (seconds > 9) {
    secondsStr = seconds
  } else if (seconds <= 9 && seconds >= 0) {
    secondsStr = `0${seconds}`
  }

  return `${hoursStr}${minutesStr}:${secondsStr}`
}
