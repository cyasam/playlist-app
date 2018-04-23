import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import { matchRoutes } from 'react-router-config'
import { createStore, applyMiddleware } from 'redux'
import admin from 'firebase-admin'
import serviceAccount from './config/service-key.js'
import rootReducer from '../scripts/reducers'
import thunk from 'redux-thunk'
import Routes from '../scripts/Routes'
import renderer from './helpers/renderer'
import { authSuccess } from '../scripts/actions/handle-auth'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://playlist-app-cbfd5.firebaseio.com'
})

const app = express()
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/assets/', express.static('dist/assets/'))

app.get('**', async (req, res) => {
  const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
  )

  const token = req.cookies.token

  try {
    if (token) {
      const decodedToken = await admin.auth().verifyIdToken(token, true)

      if (!decodedToken) {
        store.dispatch(authSuccess(null))
      } else {
        store.dispatch(authSuccess(decodedToken))
      }
    }
  } catch (error) {
    throw error
  }

  const matched = matchRoutes(Routes, req.path).map(({ route, match }) => {
    return route.loadData ? route.loadData(store, match) : null
  })

  Promise.all(matched).then(() => {
    res.send(renderer(req, store))
  })
})

app.post('/api/login', (req, res) => {
  const { uid } = req.body.user

  admin.auth().getUser(uid)
    .then(userRecord => {
      if (Object.keys(userRecord).length) {
        res.send({ auth: userRecord })
      } else {
        res.send({ auth: null })
      }
    })
})

export default app
