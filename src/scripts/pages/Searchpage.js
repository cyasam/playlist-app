import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import fetchSearch from '../actions/fetch-search'
import loadmoreSearch from '../actions/loadmore-search'
import VideoList from '../components/video/VideoList'

export class Searchpage extends Component {
  constructor () {
    super()
    this.loadMore = this.loadMore.bind(this)
  }

  componentDidMount () {
    const { history, fetchSearch } = this.props
    const queryStr = queryString.parse(history.location.search)
    fetchSearch(queryStr.query)
  }

  loadMore (nextPageToken) {
    const { searchResult: { query }, loadmoreSearch } = this.props
    loadmoreSearch(query, nextPageToken)
  }

  render () {
    const { searchResult: { isFetching, videos, nextPageToken } } = this.props

    return (
      <Fragment>
        <h3 className='main-title'>Search Results</h3>
        <VideoList isFetching={isFetching}
          videos={videos}
          nextPageToken={nextPageToken}
          loadMoreCallback={this.loadMore} />
      </Fragment>
    )
  }
}

Searchpage.propTypes = {
  searchResult: PropTypes.object.isRequired,
  fetchSearch: PropTypes.func.isRequired,
  loadmoreSearch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}

export const mapStateToProps = state => ({
  searchResult: state.search
})

export default withRouter(connect(mapStateToProps, { fetchSearch, loadmoreSearch })(Searchpage))
