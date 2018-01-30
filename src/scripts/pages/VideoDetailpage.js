import React from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { withRouter } from 'react-router-dom'
import VideoDetail from '../components/video/VideoDetail'

const VideoDetailPage = ({history}) => {
  const queryStr = queryString.parse(history.location.search)
  document.title = queryStr.v
  return (
    <VideoDetail videoId={queryStr.v} />
  )
}

VideoDetailPage.propTypes = {
  history: PropTypes.object.isRequired
}

export default withRouter(VideoDetailPage)
