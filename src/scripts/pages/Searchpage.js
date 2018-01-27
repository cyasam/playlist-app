import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import VideoList from '../components/video/video-list'

export class Searchpage extends Component {
  render () {
    const { searchResult: { response: videos } } = this.props
    return (
      <div>
        <h2>Search Results</h2>
        <VideoList videos={videos} />
      </div>
    )
  }
}

Searchpage.propTypes = {
  searchResult: PropTypes.object.isRequired
}

export const mapStateToProps = state => ({
  searchResult: state.search
})

export default connect(mapStateToProps)(Searchpage)
