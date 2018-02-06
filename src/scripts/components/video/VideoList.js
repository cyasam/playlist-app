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
    const { isFetching, videos, nextPageToken } = this.props

    if (isFetching && !videos.length) {
      return <Loading />
    }

    return (
      <div className='video-list'>
        <div className='video-list-inner row'>
          { this.renderVideoResult(videos) }
        </div>
        { isFetching && <Loading /> }
        { !isFetching && nextPageToken &&
          <button onClick={this.loadMoreCallback} className='btn btn-secondary'>Load More</button>
        }
      </div>
    )
  }
}

VideoList.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  videos: PropTypes.array.isRequired,
  nextPageToken: PropTypes.string,
  loadMoreCallback: PropTypes.func
}

export default VideoList
