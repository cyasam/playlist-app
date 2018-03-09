import Homepage from './pages/Homepage'
import Searchpage from './pages/Searchpage'
import VideoDetailpage from './pages/VideoDetailpage'

const Routes = [
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
  }
]

export default Routes
