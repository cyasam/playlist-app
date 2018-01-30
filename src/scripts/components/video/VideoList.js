import React, { Component } from 'react'
import PropTypes from 'prop-types'
import VideoListItem from './VideoListItem'

class VideoList extends Component {
  loadMoreVideos (nextPageToken) {
    this.props.loadMoreVideos(nextPageToken)
  }

  render () {
    const { videoData: videos } = this.props
    if (!videos) {
      return null
    } else if (!videos.length) {
      return <div>No result</div>
    }

    return (
      <div className='video-list'>
        <div className='video-list-inner row'>
          {
            videos.map((video, index) => (
              <VideoListItem key={index} video={video} />
            ))
          }
        </div>
        <button onClick={() => this.loadMoreVideos('ss')} className='btn btn-secondary'>Load More</button>
      </div>
    )
  }
}

VideoList.propTypes = {
  videoData: PropTypes.array,
  loadMoreVideos: PropTypes.func.isRequired
}

export default VideoList
