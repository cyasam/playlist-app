import React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import firebase from 'firebase'
import { firebaseConfig } from './config'
import rootReducer from './reducers'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import Routes from './Routes'

import '../styles/app.scss'

const preloadedStore = window.__PRELOADED_STATE__
delete window.__PRELOADED_STATE__

const middlewares = [thunk]
// if (process.env.NODE_ENV === 'development') {
middlewares.push(logger)
// }

const store = createStore(
  rootReducer,
  preloadedStore,
  applyMiddleware(...middlewares)
)

firebase.initializeApp(firebaseConfig)

hydrate(
  <Provider store={store}>
    <Router>
      { renderRoutes(Routes) }
    </Router>
  </Provider>, document.getElementById('app'))
