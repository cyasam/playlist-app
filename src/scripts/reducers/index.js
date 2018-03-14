import { combineReducers } from 'redux'
import handleAuth from './handle-auth'
import fetchSearch from './fetch-search'
import fetchTrendings from './fetch-trendings'
import fetchVideoDetail from './fetch-video-detail'

export default combineReducers({
  authentication: handleAuth,
  search: fetchSearch,
  trendings: fetchTrendings,
  videoDetail: fetchVideoDetail
})
