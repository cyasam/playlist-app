import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import fetchSearch from '../actions/fetch-search'
import VideoList from '../components/video/video-list'

export class Searchpage extends Component {
  componentDidMount () {
    const { fetchSearch, history } = this.props
    const queryStr = queryString.parse(history.location.search)
    fetchSearch(queryStr.query)
  }

  render () {
    const { searchResult: { response: videos } } = this.props
    return (
      <Fragment>
        <h2>Search Results</h2>
        <VideoList videos={videos} />
      </Fragment>
    )
  }
}

Searchpage.propTypes = {
  searchResult: PropTypes.object.isRequired,
  fetchSearch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}

export const mapStateToProps = state => ({
  searchResult: state.search
})

export default withRouter(connect(mapStateToProps, { fetchSearch })(Searchpage))
