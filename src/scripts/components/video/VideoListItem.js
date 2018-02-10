import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import ProgressiveImage from 'react-progressive-image'
import imagePlaceholder from '../../../images/icons/image-placeholder.jpg'
import VideoViews from './VideoViews'

const VideoListItem = ({video}) => {
  if (!Object.keys(video).length) {
    return null
  }
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
          <p className='card-info'>{video.channelTitle}</p>
          <p className='card-info'>
            { Object.keys(video.statistics).length &&
            <VideoViews viewCount={video.statistics.viewCount} format='summary' />
            } • <Moment fromNow>{video.publishedAt}</Moment>
          </p>
        </div>
      </div>
    </Link>
  )
}

VideoListItem.propTypes = {
  video: PropTypes.object.isRequired
}

export default VideoListItem
