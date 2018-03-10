import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import fetchSearch from '../actions/fetch-search'
import searchIcon from '../../images/icons/magnifying-glass.svg'

export class Searchbox extends Component {
  constructor () {
    super()

    this.state = { input: '' }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () {
    const { search: { query } } = this.props
    if (query) this.setState({ input: query })
  }

  componentWillReceiveProps (nextProps) {
    const { search: { query }, history: { location: { pathname } } } = nextProps
    const input = pathname.includes('search') ? query : ''
    this.setState({ input })
  }

  handleSubmit (e) {
    e.preventDefault()

    if (this.state.input.length) {
      const { history, fetchSearch } = this.props
      history.push(`/search/${this.state.input}`)
      fetchSearch(this.state.input)
    }
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

const mapStateToProps = state => ({
  search: state.search
})

Searchbox.propTypes = {
  search: PropTypes.object.isRequired,
  fetchSearch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}

export default withRouter(connect(mapStateToProps, { fetchSearch })(Searchbox))
