import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setDocumentTitle } from '../helpers'
import fetchTrendings from '../actions/fetch-trendings'
import VideoList from '../components/video/VideoList'

export class Homepage extends Component {
  componentDidMount () {
    this.props.fetchTrendings()
  }

  render () {
    const { trendings: { isFetching, videos, error } } = this.props
    setDocumentTitle('Home')

    return (
      <Fragment>
        <h3 className='main-title'>Trend Videos</h3>
        <VideoList isFetching={isFetching}
          videos={videos}
          error={error} />
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
