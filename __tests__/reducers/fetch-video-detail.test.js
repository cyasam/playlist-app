import { FETCH_VIDEO_DETAIL_REQUEST, FETCH_VIDEO_DETAIL_SUCCESS, FETCH_VIDEO_DETAIL_ERROR } from '../../src/scripts/actions/fetch-video-detail'
import fetchVideoDetailReducer from '../../src/scripts/reducers/fetch-video-detail'

describe('Fetch VideoDetail Reducer', () => {
  const defaultState = { isFetching: true, video: {} }

  it('returns initial state handling with unknown type', () => {
    expect(fetchVideoDetailReducer(undefined, {})).toEqual(defaultState)
  })

  it('returns state of `FETCH_VIDEO_DETAIL_REQUEST` type action', () => {
    const expectedState = defaultState

    const expectedAction = {
      type: FETCH_VIDEO_DETAIL_REQUEST,
      payload: {
        isFetching: true
      }
    }

    expect(fetchVideoDetailReducer(defaultState, expectedAction)).toEqual(expectedState)
  })

  it('returns state of `FETCH_VIDEO_DETAIL_SUCCESS` type action', () => {
    const expectedState = {
      isFetching: false,
      video: {
        id: 'xyz',
        title: 'Video Title',
        channelTitle: 'Channel Title'
      },
      error: null
    }

    const expectedAction = {
      type: FETCH_VIDEO_DETAIL_SUCCESS,
      payload: {
        isFetching: false,
        video: {
          id: 'xyz',
          title: 'Video Title',
          channelTitle: 'Channel Title'
        },
        error: null
      }
    }

    expect(fetchVideoDetailReducer(defaultState, expectedAction)).toEqual(expectedState)
  })

  it('returns state of `FETCH_VIDEO_DETAIL_ERROR` type action', () => {
    const expectedState = {
      isFetching: false,
      video: {},
      error: {
        message: 'Error'
      }
    }

    const expectedAction = {
      type: FETCH_VIDEO_DETAIL_ERROR,
      payload: {
        isFetching: false,
        error: {
          message: 'Error'
        }
      }
    }

    expect(fetchVideoDetailReducer(defaultState, expectedAction)).toEqual(expectedState)
  })
})
