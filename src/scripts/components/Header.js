import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Searchbox from './Searchbox'
import { signOut } from '../actions/handle-auth'

export const Header = ({ auth, signOut }) => {
  return (
    <header>
      <nav className='navbar navbar-expand-lg navbar-dark bg-primary'>
        <Link to='/' className='navbar-brand'>Playlist App</Link>
        <Searchbox />

        { auth ? (
          <button
            className='logout-btn btn btn-secondary'
            onClick={() => signOut()}
          >
            Logout
          </button>
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
  auth: PropTypes.object,
  signOut: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { signOut })(Header)
