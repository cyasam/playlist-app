import React, { Component } from 'react'
import PropTypes from 'prop-types'

class VideoViews extends Component {
  formatSummary (viewCount) {
    let formattedViewCount = Number(viewCount)
    if (viewCount >= 1000 && viewCount < 999999) {
      formattedViewCount = Math.floor(viewCount / 1000)
      formattedViewCount = `${formattedViewCount}K`
    } else if (viewCount >= 1000000 && viewCount < 999999999) {
      formattedViewCount = Math.floor(viewCount / 100000)
      formattedViewCount = `${formattedViewCount / 10}M`
    } else if (viewCount >= 1000000000) {
      formattedViewCount = Math.floor(viewCount / 100000000)
      formattedViewCount = `${formattedViewCount / 10}B`
    } else {
      formattedViewCount = viewCount
    }

    return formattedViewCount
  }

  formatNumeric (viewCount) {
    return viewCount.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
  }

  selectFormat (format) {
    const { viewCount } = this.props
    if (format === 'summary') {
      return this.formatSummary(viewCount)
    } else {
      return this.formatNumeric(viewCount)
    }
  }

  render () {
    const { format } = this.props
    return (
      <span>{this.selectFormat(format)} views</span>
    )
  }
}

VideoViews.propTypes = {
  viewCount: PropTypes.string.isRequired,
  format: PropTypes.string
}

VideoViews.defaultProps = {
  format: 'numeric'
}

export default VideoViews
