import React, { Component } from 'react'
import PropTypes from 'prop-types'
import VideoListItem from './VideoListItem'
import Loading from '../Loading'

class VideoList extends Component {
  constructor () {
    super()
    this.loadMoreCallback = this.loadMoreCallback.bind(this)
  }

  renderVideoResult (videos) {
    let result
    if (videos.length) {
      result = videos.map((video, index) => (
        <VideoListItem key={index} video={video} />
      ))
    } else {
      result = <div className='no-result'>No result</div>
    }

    return result
  }

  loadMoreCallback (e) {
    e.preventDefault()
    const { loadMoreCallback, nextPageToken } = this.props
    loadMoreCallback(nextPageToken)
  }

  render () {
    const { isFetching, videos, nextPageToken, error } = this.props

    if (isFetching && !videos.length) {
      return <Loading />
    } else if (error && !videos.length) {
      return <div className='error'>{ error }</div>
    }

    return (
      <div className='video-list'>
        <div className='video-list-inner row'>
          { this.renderVideoResult(videos) }
        </div>
        { isFetching && <Loading /> }
        { error && <div className='error'>{ error }</div> }
        { !isFetching && nextPageToken &&
          <div className='loadmore-btn-wrapper'>
            <button onClick={this.loadMoreCallback} className='btn btn-secondary'>Load More</button>
          </div>
        }
      </div>
    )
  }
}

VideoList.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  videos: PropTypes.array.isRequired,
  nextPageToken: PropTypes.string,
  error: PropTypes.string,
  loadMoreCallback: PropTypes.func
}

export default VideoList
