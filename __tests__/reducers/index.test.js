import rootReducer from '../../src/scripts/reducers/index'

describe('Root Reducer', () => {
  it('returns initial state', () => {
    const expectedState = {
      search: { isFetching: true, videos: [] },
      trendings: { isFetching: true, videos: [] },
      videoDetail: { isFetching: true, video: {} }
    }
    expect(rootReducer({}, {})).toEqual(expectedState)
  })
})
