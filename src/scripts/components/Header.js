import React from 'react'
import { Link } from 'react-router-dom'
import Searchbox from './Searchbox'

const Header = () => {
  return (
    <header>
      <nav className='navbar navbar-expand-lg navbar-dark bg-primary'>
        <Link to='/' className='navbar-brand'>Playlist App</Link>
        <Searchbox />
        <Link to='/login' className='login-btn btn btn-secondary'>Login</Link>
      </nav>
    </header>
  )
}

export default Header
