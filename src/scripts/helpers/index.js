import { appTitle } from '../config'

export const setDocumentTitle = title => {
  return title ? `${title} - ${appTitle}` : appTitle
}

export const filterVideoResult = result => {
  const videos = result.items.map(item => {
    return {
      id: item.id,
      title: item.snippet.title,
      channelTitle: item.snippet.channelTitle,
      statistics: item.statistics,
      publishedAt: item.snippet.publishedAt,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.high
    }
  })

  return {
    videos,
    nextPageToken: result.nextPageToken
  }
}

export const filterVideoDetailResult = result => {
  const item = result.items[0]

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
