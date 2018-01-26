import fetchSearch from './fetch-search'
import { combineReducers } from 'redux'

export default combineReducers({
  search: fetchSearch
})
