import React from 'react'
import PropTypes from 'prop-types'
import TimeAgo from 'react-timeago'
import Loading from '../Loading'

const VideoDetail = ({ data }) => {
  const { isFetching, video, error } = data
  if (isFetching && !Object.keys(video).length) {
    return <Loading />
  } else if (error && !Object.keys(video).length) {
    return <div className='error'>{ error }</div>
  } else if (!isFetching && !Object.keys(video).length) {
    return <div className='no-result'>Video is not found</div>
  }

  return (
    <div className='video-detail'>
      <div className='embed-responsive embed-responsive-16by9'>
        <iframe className='embed-responsive-item' src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
          frameBorder='0' allow='encrypted-media' allowFullScreen />
      </div>
      <div className='video-description'>
        <h4 className='card-title'>{video.title}</h4>
        <p>{video.channelTitle} - <TimeAgo date={video.publishedAt} /> - {video.viewCount}</p>
      </div>
    </div>
  )
}

VideoDetail.propTypes = {
  data: PropTypes.object.isRequired
}

export default VideoDetail
