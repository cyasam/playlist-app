import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Header from './components/header'
import Container from './components/container'

import Homepage from './pages/Homepage'
import Searchpage from './pages/Searchpage'
import VideoDetailpage from './pages/VideoDetailpage'

const App = () => {
  return (
    <div className='wrapper'>
      <Header />
      <Container>
        <Route path='/' exact component={Homepage} />
        <Route path='/search/:query' component={Searchpage} />
        <Route path='/watch/:id' component={VideoDetailpage} />
        <Redirect to='/' />
      </Container>
    </div>
  )
}

export default App
