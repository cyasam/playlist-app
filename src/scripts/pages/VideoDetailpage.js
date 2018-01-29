import React from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { withRouter } from 'react-router-dom'

const VideoDetail = ({history}) => {
  const queryStr = queryString.parse(history.location.search)
  document.title = queryStr.v
  return (
    <div>
      <iframe width='560' height='315' src={`https://www.youtube.com/embed/${queryStr.v}?autoplay=1`}
        frameBorder='0' allow='autoplay; encrypted-media' allowFullScreen />
    </div>
  )
}

VideoDetail.propTypes = {
  history: PropTypes.object.isRequired
}

export default withRouter(VideoDetail)
