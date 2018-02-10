import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import Loading from '../Loading'
import VideoViews from './VideoViews'
import VideoDescription from './VideoDescription'

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
      <div className='video embed-responsive embed-responsive-16by9'>
        <iframe className='embed-responsive-item' src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
          frameBorder='0' allow='encrypted-media' allowFullScreen />
      </div>
      <div className='video-details'>
        <h4 className='card-title'>{video.title}</h4>
        <p><VideoViews viewCount={video.statistics.viewCount} /></p>
      </div>
      <div className='channel-info'>
        <div className='media'>
          <div className='media-body'>
            <h5>{video.channelTitle}</h5>
            <p>Published on <Moment format='MMM D, YYYY' date={video.publishedAt} /></p>
            {video.description &&
              <VideoDescription text={video.description} />
            }
          </div>
        </div>
      </div>
    </div>
  )
}

VideoDetail.propTypes = {
  data: PropTypes.object.isRequired
}

export default VideoDetail
