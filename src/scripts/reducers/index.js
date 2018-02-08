import { combineReducers } from 'redux'
import fetchSearch from './fetch-search'
import fetchTrendings from './fetch-trendings'
import fetchVideoDetail from './fetch-video-detail'

export default combineReducers({
  search: fetchSearch,
  trendings: fetchTrendings,
  videoDetail: fetchVideoDetail
})
