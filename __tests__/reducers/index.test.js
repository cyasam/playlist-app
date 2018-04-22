import rootReducer from '../../src/scripts/reducers/index'
import { INITIAL_STATE as handleAuthInitialState } from '../../src/scripts/reducers/handle-auth'

describe('Root Reducer', () => {
  it('returns initial state', () => {
    const expectedState = {
      authentication: handleAuthInitialState,
      search: { isFetching: true, videos: [] },
      trendings: { isFetching: true, videos: [] },
      videoDetail: { isFetching: true, video: {} }
    }
    expect(rootReducer({}, {})).toEqual(expectedState)
  })
})
