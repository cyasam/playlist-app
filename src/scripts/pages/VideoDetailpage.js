import React, { Component } from 'react'
import PropTypes from 'prop-types'
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
    window.scrollTo(0, 0)
    const { match: { params: { id } }, videoDetail: { video } } = this.props
    if (!Object.keys(video).length || video.id !== id) this.fetchData(id)
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.match.params.id !== nextProps.match.params.id) {
      window.scrollTo(0, 0)
      const { match: { params: { id } } } = nextProps
      this.fetchData(id)
    }
  }

  fetchData (id) {
    const { fetchVideoDetail, fetchTrendings } = this.props

    fetchVideoDetail(id)
    fetchTrendings()
  }

  render () {
    const { videoDetail, trendings } = this.props

    const title = setDocumentTitle(videoDetail.video.title)

    return (
      <DocumentTitle title={title}>
        <div className='detail-page'>
          <div className='row'>
            <div className='video-detail-box col-8'>
              <VideoDetail data={videoDetail} />
            </div>
            <div className='list-box col-4'>
              <VideoList isFetching={trendings.isFetching}
                videos={trendings.videos}
                error={trendings.error}
                listType='media' />
            </div>
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

export const loadData = (store, match) => {
  return Promise.all([ store.dispatch(fetchVideoDetail(match.params.id)), store.dispatch(fetchTrendings()) ])
}

VideoDetailPage.propTypes = {
  match: PropTypes.object.isRequired,
  videoDetail: PropTypes.object.isRequired,
  trendings: PropTypes.object.isRequired,
  fetchVideoDetail: PropTypes.func.isRequired,
  fetchTrendings: PropTypes.func.isRequired
}

export default {
  loadData,
  component: withRouter(connect(mapStateToProps, { fetchVideoDetail, fetchTrendings })(VideoDetailPage))
}
