import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Searchbox from './Searchbox'

export const Header = ({ auth }) => {
  return (
    <header>
      <nav className='navbar navbar-expand-lg navbar-dark bg-primary'>
        <Link to='/' className='navbar-brand'>Playlist App</Link>
        <Searchbox />

        { auth ? (
          <Link to='/logout' className='logout-btn btn btn-secondary'>Logout</Link>
        ) : (
          <Link to='/login' className='login-btn btn btn-secondary'>Login</Link>
        )}
      </nav>
    </header>
  )
}

export const mapStateToProps = state => ({
  auth: state.authentication.auth
})

Header.propTypes = {
  auth: PropTypes.object
}

export default connect(mapStateToProps)(Header)
