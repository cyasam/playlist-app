import React from 'react'
import PropTypes from 'prop-types'
import VideoListItem from './VideoListItem'

const VideoList = ({ videos }) => {
  if (!videos) {
    return null
  } else if (!videos.length) {
    return <div>No result</div>
  }

  return (
    <div className='video-list row'>
      {
        videos.map((video, index) => (
          <VideoListItem key={index} video={video} />
        ))
      }
    </div>
  )
}

VideoList.propTypes = {
  videos: PropTypes.array
}

export default VideoList
