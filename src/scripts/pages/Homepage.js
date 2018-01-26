import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import VideoList from '../components/video/video-list'

export class Homepage extends Component {
  render () {
    const { searchResult: { response: videos } } = this.props
    return (
      <div className='container'>
        <h2>Trending Videos</h2>
        <VideoList videos={videos} />
      </div>
    )
  }
}

Homepage.propTypes = {
  searchResult: PropTypes.object.isRequired
}

export default connect(
  state => ({
    searchResult: state.search
  })
)(Homepage)
