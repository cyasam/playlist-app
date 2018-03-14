import App from './App'
import Homepage from './pages/Homepage'
import Searchpage from './pages/Searchpage'
import VideoDetailpage from './pages/VideoDetailpage'
import Loginpage from './pages/Loginpage'

const Routes = [
  {
    ...App,
    routes: [
      {
        ...Homepage,
        path: '/',
        exact: true
      },
      {
        ...Searchpage,
        path: '/search/:query'
      },
      {
        ...VideoDetailpage,
        path: '/watch/:id'
      },
      {
        ...Loginpage,
        path: '/login'
      }
    ]
  }
]

export default Routes
