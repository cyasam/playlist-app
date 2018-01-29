import React from 'react'
import PropTypes from 'prop-types'
import TimeAgo from 'react-timeago'
import { Link } from 'react-router-dom'
import { shorthenText } from '../../helpers'

const VideoListItem = ({video}) => {
  return (
    <Link to={`/watch?v=${video.id}`} className='video-list-item col-xl-3 col-lg-4 col-md-6 col-sm-6'>
      <div className='card'>
        { video.thumbnail &&
          <img className='card-img-top' src={video.thumbnail.url} alt={video.title} width={video.thumbnail.width} height={video.thumbnail.height} />
        }
        <div className='card-body'>
          <h5 className='card-title'>{video.title}</h5>
          <p className='card-info'>{video.channelTitle} - <TimeAgo date={video.publishedAt} /> - {video.viewCount}</p>
          <p className='card-text'>{shorthenText(video.description, 80)}</p>
        </div>
      </div>
    </Link>
  )
}

VideoListItem.propTypes = {
  video: PropTypes.object.isRequired
}

export default VideoListItem
