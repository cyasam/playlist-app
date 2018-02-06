import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import fetchTrendings from '../actions/fetch-trendings'
import VideoList from '../components/video/VideoList'

export class Homepage extends Component {
  componentDidMount () {
    this.props.fetchTrendings()
  }

  render () {
    const { trendings: { isFetching, videos } } = this.props

    return (
      <Fragment>
        <h3 className='main-title'>Trend Videos</h3>
        <VideoList isFetching={isFetching}
          videos={videos} />
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
