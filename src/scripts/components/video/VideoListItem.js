import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import { ConvertYouTubeDuration } from '../../helpers'
import VideoViews from './VideoViews'

class VideoListItem extends Component {
  renderMediaType (video) {
    const duration = new ConvertYouTubeDuration(video.duration)
    return (
      <Link to={`/watch/${video.id}`} className='video-list-item media-type'>
        <div className='media'>
          { video.thumbnail &&
            <div className='card-thumbnail col-6'>
              <div className='media-img-wrapper'>
                <img className='media-img' src={video.thumbnail.url} alt={video.title} />
                <div className='duration'>{ duration.convert() }</div>
              </div>
            </div>
          }
          <div className='media-body'>
            <h6 className='media-title mt-1'>{video.title}</h6>
            <p className='card-info mb-2'>{video.channelTitle}</p>
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

  renderCardType (video) {
    const duration = new ConvertYouTubeDuration(video.duration)
    return (
      <Link to={`/watch/${video.id}`} className='video-list-item card-type col-xl-3 col-lg-4 col-md-6 col-sm-6'>
        <div className='card'>
          { video.thumbnail &&
            <div className='card-thumbnail'>
              <div className='media-img-wrapper'>
                <img className='card-img-top' src={video.thumbnail.url} alt={video.title} />
                <div className='duration'>{ duration.convert() }</div>
              </div>
            </div>
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

  render () {
    const { video, type } = this.props
    if (!Object.keys(video).length) {
      return null
    }

    if (type === 'media') {
      return this.renderMediaType(video)
    }

    return this.renderCardType(video)
  }
}

VideoListItem.propTypes = {
  video: PropTypes.object.isRequired,
  type: PropTypes.string
}

export default VideoListItem
