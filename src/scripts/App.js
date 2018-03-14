import React, { Component } from 'react'
import firebase from 'firebase'
import { renderRoutes } from 'react-router-config'
import PropTypes from 'prop-types'
import { firebaseConfig } from './config'
import Header from './components/header'
import Container from './components/container'

export class App extends Component {
  componentDidMount () {
    firebase.initializeApp(firebaseConfig)
  }
  render () {
    return (
      <div className='wrapper'>
        <Header />
        <Container>
          { renderRoutes(this.props.route.routes) }
        </Container>
      </div>
    )
  }
}

App.propTypes = {
  route: PropTypes.object.isRequired
}

export default {
  component: App
}
