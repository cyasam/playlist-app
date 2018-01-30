import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import fetchTrendings from '../actions/fetch-trendings'
import VideoList from '../components/video/VideoList'
import Loading from '../components/Loading'

export class Homepage extends Component {
  componentDidMount () {
    this.props.fetchTrendings()
  }

  render () {
    const { trendings: { isFetching, videos } } = this.props

    if (isFetching) {
      return <Loading />
    }

    return (
      <Fragment>
        <h3 className='main-title'>Trend Videos</h3>
        <VideoList videoData={videos} loadMoreVideos={this.props.fetchTrendings} />
      </Fragment>
    )
  }
}

export const mapStateToProps = state => ({
  trendings: state.trendings
})

Homepage.propTypes = {
  trendings: PropTypes.object.isRequired,
  fetchTrendings: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { fetchTrendings })(Homepage)
