import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import firebase from 'firebase'
import { firebaseConfig } from './config'
import cookie from 'js-cookie'
import rootReducer from './reducers'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import Routes from './Routes'

const preloadedStore = window.__PRELOADED_STATE__
delete window.__PRELOADED_STATE__

const middlewares = [thunk]
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger)
}

const store = createStore(
  rootReducer,
  preloadedStore,
  applyMiddleware(...middlewares)
)

firebase.initializeApp(firebaseConfig)
firebase.auth().onAuthStateChanged(user => {
  if (user && !cookie.get('token')) {
    user.getIdToken(true)
      .then(idToken => {
        cookie.set('token', idToken, { expires: new Date(new Date().getTime() + 60 * 60 * 1000) })
      }).catch(error => {
        throw error
      })
  }
})

export default () => (
  <Provider store={store}>
    <Router>
      { renderRoutes(Routes) }
    </Router>
  </Provider>
)
