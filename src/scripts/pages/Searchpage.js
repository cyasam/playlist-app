import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import fetchSearch from '../actions/fetch-search'
import VideoList from '../components/video/VideoList'
import Loading from '../components/Loading'

export class Searchpage extends Component {
  componentDidMount () {
    const { history } = this.props
    const queryStr = queryString.parse(history.location.search)
    fetchSearch(queryStr.query)
  }

  render () {
    const { searchResult: { isFetching, videos }, fetchSearch } = this.props

    if (isFetching) {
      return <Loading />
    }
    return (
      <Fragment>
        <h3 className='main-title'>Search Results</h3>
        <VideoList videoData={videos} loadMoreVideos={fetchSearch} />
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
