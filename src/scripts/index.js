import React from 'react'
import { hydrate } from 'react-dom'
import AppContainer from './AppContainer'

import '../styles/app.scss'

hydrate(
  <AppContainer />, document.getElementById('app')
)
