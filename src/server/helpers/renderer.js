import React from 'react'
import fs from 'fs'
import path from 'path'
import serialize from 'serialize-javascript'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { renderRoutes } from 'react-router-config'
import Routes from '../../scripts/Routes'

export default (req, store) => {
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path} context={{}}>
        { renderRoutes(Routes) }
      </StaticRouter>
    </Provider>
  )

  const preloadedState = store.getState()

  const htmlFile = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf8')
  const html = htmlFile.replace('<div id=app></div>',
    `<div id=app>${content}</div>
      <script>
        window.__PRELOADED_STATE__ = ${serialize(preloadedState)}
      </script>
    `)

  return html
}
