import React from 'react'
import { Route } from 'react-router-dom'
import Header from './components/header'
import Container from './components/container'

import Homepage from './pages/Homepage'

const App = () => {
  return (
    <div className='wrapper'>
      <Header />
      <Container>
        <Route path='/' component={Homepage} />
      </Container>
    </div>
  )
}

export default App
