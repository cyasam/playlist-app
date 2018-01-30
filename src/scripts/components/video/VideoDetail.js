import React from 'react'
import PropTypes from 'prop-types'

const VideoDetail = ({videoId}) => {
  if (!videoId) {
    return <div>Error: Video not found.</div>
  }

  return (
    <div>
      <iframe width='560' height='315' src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameBorder='0' allow='encrypted-media' allowFullScreen />
    </div>
  )
}

VideoDetail.propTypes = {
  videoId: PropTypes.string
}

export default VideoDetail
