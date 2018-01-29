export const filterVideoResult = (result) => {
  return result.items.map(item => {
    return {
      id: item.id,
      title: item.snippet.title,
      channelTitle: item.snippet.channelTitle,
      viewCount: item.statistics.viewCount,
      publishedAt: item.snippet.publishedAt,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.medium
    }
  })
}

export const shorthenText = (text, maxLength = 100) => {
  return (text && text.length > maxLength) ? `${text.substr(0, maxLength)}...` : text
}
