import express from 'express'
import { matchRoutes } from 'react-router-config'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../scripts/reducers'
import thunk from 'redux-thunk'
import Routes from '../scripts/Routes'
import renderer from './helpers/renderer'

const app = express()

app.use('/assets/', express.static('dist/assets/'))

app.get('**', (req, res) => {
  const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
  )

  const matched = matchRoutes(Routes, req.path).map(({ route, match }) => {
    return route.loadData ? route.loadData(store, match) : null
  })

  Promise.all(matched).then(() => {
    res.send(renderer(req, store))
  })
})

app.listen(3002, () => {
  console.log('Server is running.')
})
