import React, { Component } from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import DocumentTitle from 'react-document-title'
import { setDocumentTitle } from '../helpers'
import VideoList from '../components/video/VideoList'
import fetchTrendings from '../actions/fetch-trendings'
import VideoDetail from '../components/video/VideoDetail'
import fetchVideoDetail from '../actions/fetch-video-detail'

export class VideoDetailPage extends Component {
  componentDidMount () {
    const { history } = this.props

    this.fetchData()

    this.historyListener = history.listen(() => {
      this.fetchData()
    })
  }

  componentWillUnmount () {
    this.historyListener()
  }

  fetchData () {
    window.scrollTo(0, 0)
    const { history } = this.props
    if (history.location.pathname !== '/watch') {
      return null
    }

    const { fetchVideoDetail, fetchTrendings } = this.props
    const queryStr = queryString.parse(history.location.search)

    if (!queryStr.v) {
      history.push('/')
    }

    fetchVideoDetail(queryStr.v)
    fetchTrendings()
  }

  render () {
    const { videoDetail, trendings } = this.props
    const title = setDocumentTitle(videoDetail.video.title)

    return (
      <DocumentTitle title={title}>
        <div className='row'>
          <div className='col-8'>
            <VideoDetail data={videoDetail} />
          </div>
          <div className='col-4'>
            <VideoList isFetching={trendings.isFetching}
              videos={trendings.videos}
              error={trendings.error}
              listType='media' />
          </div>
        </div>
      </DocumentTitle>
    )
  }
}

export const mapStateToProps = state => ({
  videoDetail: state.videoDetail,
  trendings: state.trendings
})

VideoDetailPage.propTypes = {
  history: PropTypes.object.isRequired,
  videoDetail: PropTypes.object.isRequired,
  trendings: PropTypes.object.isRequired,
  fetchVideoDetail: PropTypes.func.isRequired,
  fetchTrendings: PropTypes.func.isRequired
}

export default withRouter(connect(mapStateToProps, { fetchVideoDetail, fetchTrendings })(VideoDetailPage))
