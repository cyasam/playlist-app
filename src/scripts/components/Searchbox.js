import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import fetchSearch from '../actions/fetch-search'
import searchIcon from '../../images/icons/magnifying-glass.svg'

export class Searchbox extends Component {
  constructor () {
    super()
    this.state = {
      input: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.fetchSearch(this.state.input)
  }

  render () {
    return (
      <form className='search-form mr-auto' onSubmit={this.handleSubmit}>
        <input type='text' className='form-control mr-sm-2' onChange={(e) => this.setState({input: e.target.value})} placeholder='Search videos on youtube' />
        <button className='btn btn-secondary my-2 my-sm-0' type='submit'><img src={searchIcon} alt='Search' width='16' height='16' /></button>
      </form>
    )
  }
}

Searchbox.propTypes = {
  fetchSearch: PropTypes.func.isRequired
}

export default connect(null, { fetchSearch })(Searchbox)
