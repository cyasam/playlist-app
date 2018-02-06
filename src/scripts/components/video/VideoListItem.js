import React from 'react'
import PropTypes from 'prop-types'
import TimeAgo from 'react-timeago'
import { Link } from 'react-router-dom'
import ProgressiveImage from 'react-progressive-image'
import imagePlaceholder from '../../../images/icons/image-placeholder.jpg'

const VideoListItem = ({video}) => {
  return (
    <Link to={`/watch?v=${video.id}`} className='video-list-item col-xl-3 col-lg-4 col-md-6 col-sm-6'>
      <div className='card'>
        { video.thumbnail &&
          <ProgressiveImage src={video.thumbnail.url} placeholder={imagePlaceholder}>
            {(src) => <img className='card-img-top' src={src} alt={video.title} />}
          </ProgressiveImage>
        }
        <div className='card-body'>
          <h5 className='card-title'>{video.title}</h5>
          <p className='card-info'>{video.channelTitle} - <TimeAgo date={video.publishedAt} /> - {video.viewCount}</p>
        </div>
      </div>
    </Link>
  )
}

VideoListItem.propTypes = {
  video: PropTypes.object.isRequired
}

export default VideoListItem
