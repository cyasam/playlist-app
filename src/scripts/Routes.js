import Homepage, { loadHomeData } from './pages/Homepage'
import Searchpage, { loadSearchData } from './pages/Searchpage'
import VideoDetailpage, { loadVideoDetailData } from './pages/VideoDetailpage'

const Routes = [
  {
    loadData: loadHomeData,
    path: '/',
    component: Homepage,
    exact: true
  },
  {
    loadData: loadSearchData,
    path: '/search/:query',
    component: Searchpage
  },
  {
    loadData: loadVideoDetailData,
    path: '/watch/:id',
    component: VideoDetailpage
  }
]

export default Routes
