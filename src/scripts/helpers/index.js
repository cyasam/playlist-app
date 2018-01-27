export const filterVideoResult = (result) => {
  return result.items.map(item => {
    return {
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.medium
    }
  })
}
