import React, { Component } from 'react'
import PropTypes from 'prop-types'

class VideoDescription extends Component {
  constructor () {
    super()

    this.state = {
      textHeight: 0,
      collapsed: false
    }

    this.maxHeight = 65

    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount () {
    if (this.descText) {
      this.setState({ textHeight: this.descText.clientHeight }, () => this.checkHeight())
    }
  }

  handleClick () {
    const { collapsed } = this.state

    this.setState({ collapsed: !collapsed })
  }

  renderClassName () {
    const { collapsed } = this.state
    const className = 'text'
    return collapsed ? `${className} collapsed` : className
  }

  checkHeight () {
    const { textHeight } = this.state
    if (textHeight > this.maxHeight) {
      this.setState({ collapsed: true })
    }
  }

  renderButton () {
    const { collapsed, textHeight } = this.state

    if (textHeight > this.maxHeight) {
      const buttonText = collapsed ? 'SHOW MORE' : 'SHOW LESS'
      return <button className='more-btn btn btn-sm' onClick={this.handleClick}>{buttonText}</button>
    }

    return null
  }

  render () {
    const { text } = this.props

    if (!text) {
      return null
    }

    return (
      <div className='description'>
        <div ref={(node) => { this.descText = node }} className={this.renderClassName()}>{text}</div>
        { this.renderButton() }
      </div>
    )
  }
}

VideoDescription.propTypes = {
  text: PropTypes.string
}

export default VideoDescription
