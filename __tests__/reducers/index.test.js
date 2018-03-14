import rootReducer from '../../src/scripts/reducers/index'

describe('Root Reducer', () => {
  it('returns initial state', () => {
    const expectedState = {
      authentication: { auth: null, error: '', loading: false },
      search: { isFetching: true, videos: [] },
      trendings: { isFetching: true, videos: [] },
      videoDetail: { isFetching: true, video: {} }
    }
    expect(rootReducer({}, {})).toEqual(expectedState)
  })
})
