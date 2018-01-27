import { combineReducers } from 'redux'
import fetchSearch from './fetch-search'
import fetchTrendings from './fetch-trendings'

export default combineReducers({
  search: fetchSearch,
  trendings: fetchTrendings
})
