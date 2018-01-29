import React, { Component } from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
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

  componentDidMount () {
    const { history } = this.props
    if (history.location.pathname.includes('/search') && history.location.search.includes('query=')) {
      const queryStr = queryString.parse(history.location.search)
      this.setState({ input: queryStr.query })
    }
  }

  handleSubmit (e) {
    e.preventDefault()

    const { history, fetchSearch } = this.props
    const historyPush = {
      pathname: '/search',
      search: this.state.input ? `?query=${this.state.input}` : null
    }
    history.push(historyPush)
    fetchSearch(this.state.input)
  }

  render () {
    return (
      <form className='search-form mr-auto' onSubmit={this.handleSubmit}>
        <input type='text' className='form-control' value={this.state.input} onChange={(e) => this.setState({input: e.target.value})} placeholder='Search videos on youtube' />
        <button className='btn btn-secondary my-sm-0' type='submit'><img src={searchIcon} alt='Search' width='16' height='16' /></button>
      </form>
    )
  }
}

Searchbox.propTypes = {
  fetchSearch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}

export default withRouter(connect(null, { fetchSearch })(Searchbox))
