import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import DocumentTitle from 'react-document-title'
import { setDocumentTitle } from '../helpers'
import fetchTrendings from '../actions/fetch-trendings'
import VideoList from '../components/video/VideoList'

export class Homepage extends Component {
  componentDidMount () {
    this.props.fetchTrendings()
  }

  render () {
    const { trendings: { isFetching, videos, error } } = this.props
    const title = setDocumentTitle('Home')

    return (
      <DocumentTitle title={title}>
        <Fragment>
          <h3 className='main-title'>Trend Videos</h3>
          <VideoList isFetching={isFetching}
            videos={videos}
            error={error} />
        </Fragment>
      </DocumentTitle>
    )
  }
}

export const mapStateToProps = state => ({
  trendings: state.trendings
})

export const loadHomeData = (store) => {
  return Promise.all([ store.dispatch(fetchTrendings()) ])
}

Homepage.propTypes = {
  trendings: PropTypes.object.isRequired,
  fetchTrendings: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { fetchTrendings })(Homepage)
