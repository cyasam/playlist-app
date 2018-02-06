import { FETCH_SEARCH_REQUEST } from '../../src/scripts/actions/fetch-search'
import rootReducer from '../../src/scripts/reducers/index'

describe('Root Reducer', () => {
  it('returns initial state', () => {
    const expectedState = { search: { isFetching: true, videos: [] }, trendings: { isFetching: true, videos: []  } }
    expect(rootReducer({}, {})).toEqual(expectedState)
  })
})