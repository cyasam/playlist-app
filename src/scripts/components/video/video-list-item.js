import React from 'react'
import PropTypes from 'prop-types'

const VideoListItem = ({video}) => {
  return (
    <div className='video-list-item col-md-4 card'>
      { video.thumbnail &&
        <img src={video.thumbnail.url} alt={video.title} width={video.thumbnail.width} height={video.thumbnail.height} />
      }
      <div className='card-body'>
        <h5 className='card-title'>{video.title}</h5>
        <p className='card-text'>{video.description}</p>
      </div>
    </div>
  )
}

VideoListItem.propTypes = {
  video: PropTypes.object.isRequired
}

export default VideoListItem
