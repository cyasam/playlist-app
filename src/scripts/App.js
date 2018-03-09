import React from 'react'
import { Redirect } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import Routes from './Routes'
import Header from './components/header'
import Container from './components/container'

const App = () => {
  return (
    <div className='wrapper'>
      <Header />
      <Container>
        { renderRoutes(Routes) }
        <Redirect to='/' />
      </Container>
    </div>
  )
}

export default App
