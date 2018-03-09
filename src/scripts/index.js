import React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import App from './App'

import '../styles/app.scss'

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, logger)
)

hydrate(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>, document.getElementById('app'))
