import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import DocumentTitle from 'react-document-title'
import { setDocumentTitle } from '../helpers'
import fetchSearch from '../actions/fetch-search'
import loadmoreSearch from '../actions/loadmore-search'
import VideoList from '../components/video/VideoList'

export class Searchpage extends Component {
  constructor () {
    super()
    this.loadMore = this.loadMore.bind(this)
  }

  componentDidMount () {
    window.scrollTo(0, 0)
    const { match: { params: { query } }, searchResult, fetchSearch } = this.props
    if (!searchResult.videos.length) fetchSearch(query)
  }

  loadMore (nextPageToken) {
    const { searchResult: { query }, loadmoreSearch } = this.props
    loadmoreSearch(query, nextPageToken)
  }

  render () {
    const { searchResult: { query, isFetching, videos, nextPageToken, error } } = this.props
    const title = setDocumentTitle(`Search Result for ${query}`)

    return (
      <DocumentTitle title={title}>
        <Fragment>
          <h3 className='main-title'>Search Results</h3>
          <VideoList isFetching={isFetching}
            videos={videos}
            nextPageToken={nextPageToken}
            error={error}
            loadMoreCallback={this.loadMore} />
        </Fragment>
      </DocumentTitle>
    )
  }
}

export const loadData = (store, match) => {
  return Promise.all([ store.dispatch(fetchSearch(match.params.query)) ])
}

Searchpage.propTypes = {
  searchResult: PropTypes.object.isRequired,
  fetchSearch: PropTypes.func.isRequired,
  loadmoreSearch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
}

export const mapStateToProps = state => ({
  searchResult: state.search
})

export default {
  loadData,
  component: withRouter(connect(mapStateToProps, { fetchSearch, loadmoreSearch })(Searchpage))
}
