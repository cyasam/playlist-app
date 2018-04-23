import React from 'react'
import { renderRoutes } from 'react-router-config'
import PropTypes from 'prop-types'
import Header from './components/Header'
import Container from './components/Container'

export const App = ({ route }) => {
  return (
    <div className='wrapper'>
      <Header />
      <Container>
        { renderRoutes(route.routes) }
      </Container>
    </div>
  )
}

App.propTypes = {
  route: PropTypes.object.isRequired
}

export default {
  component: App
}
