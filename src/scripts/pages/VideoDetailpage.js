import React, { Component } from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import DocumentTitle from 'react-document-title'
import { setDocumentTitle } from '../helpers'
import VideoDetail from '../components/video/VideoDetail'
import fetchVideoDetail from '../actions/fetch-video-detail'

export class VideoDetailPage extends Component {
  componentDidMount () {
    const { history, fetchVideoDetail } = this.props
    const queryStr = queryString.parse(history.location.search)
    if (queryStr.v) {
      fetchVideoDetail(queryStr.v)
    } else {
      history.push('/')
    }
  }

  render () {
    const { videoDetail } = this.props
    const title = setDocumentTitle(videoDetail.video.title)

    return (
      <DocumentTitle title={title}>
        <VideoDetail data={videoDetail} />
      </DocumentTitle>
    )
  }
}

const mapStateToProps = state => ({
  videoDetail: state.videoDetail
})

VideoDetailPage.propTypes = {
  history: PropTypes.object.isRequired,
  videoDetail: PropTypes.object.isRequired,
  fetchVideoDetail: PropTypes.func.isRequired
}

export default withRouter(connect(mapStateToProps, { fetchVideoDetail })(VideoDetailPage))
