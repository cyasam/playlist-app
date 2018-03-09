import React from 'react'
import fs from 'fs'
import path from 'path'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from '../../scripts/App'

export default (req, store) => {
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path} context={{}}>
        <App />
      </StaticRouter>
    </Provider>
  )

  const htmlFile = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf8')
  const html = htmlFile.replace('<div id=app></div>', `<div id="app">${content}</div>`)

  return html
}
