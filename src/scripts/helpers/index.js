import { appTitle } from '../config'

export const setDocumentTitle = title => {
  document.title = title ? `${title} - ${appTitle}` : appTitle
}

export const filterVideoResult = result => {
  const videos = result.items.map(item => {
    return {
      id: item.id,
      title: item.snippet.title,
      channelTitle: item.snippet.channelTitle,
      viewCount: item.statistics.viewCount,
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
    channelTitle: item.snippet.channelTitle,
    viewCount: item.statistics.viewCount,
    publishedAt: item.snippet.publishedAt,
    description: item.snippet.description,
    thumbnail: item.snippet.thumbnails.high
  }
}

export const shorthenText = (text, maxLength = 100) => {
  return (text && text.length > maxLength) ? `${text.substr(0, maxLength)}...` : text
}
