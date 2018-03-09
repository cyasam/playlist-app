import React from 'react'
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
      </Container>
    </div>
  )
}

export default App
