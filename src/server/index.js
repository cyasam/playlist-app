import app from './app'
import http from 'http'

const server = http.createServer(app)

server.listen(process.env.PORT || 3002, error => {
  if (error) {
    console.log(error)
  }

  console.log('🚀 started')
})
