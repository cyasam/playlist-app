import React from 'react'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { VideoDetailPage, mapStateToProps, loadData } from '../../src/scripts/pages/VideoDetailpage'
import fetchTrendings from '../../src/scripts/actions/fetch-trendings'
import fetchVideoDetail from '../../src/scripts/actions/fetch-video-detail'

const createMockStore = configureMockStore([thunk])

describe('Video Detail Page', () => {
  const setup = (propOverrides) => {
    const state = {
      videoDetail: {
        isFetching: false,
        error: null,
        video: {
          id: 'lZoA5ZX4wC0',
          title: 'Ocean Beach Surfing Raw | San…cisco, CA',
          channelTitle: 'Jeff Chavolla',
          viewCount: '121034',
          publishedAt: '2017-12-04T07:18:50.000Z',
          description: 'Raw surfing video clips of Ocean Beach in San Francisco',
          thumbnail: {
            url: 'https://i.ytimg.com/vi/lZoA5ZX4wC0/hqdefault.jpg',
            width: 480,
            height: 360
          }
        }
      },
      trendings: {
        isFetching: false,
        videos: [
          {
            id: 'lZoA5ZX4wC0',
            title: 'Video Title',
            description: 'Lorem ipsum dolor sit amed.',
            thubmnail: 'video-thumbnail.jpg'
          },
          {
            id: 'lZoA5ZX4wC01',
            title: 'Video Title 2',
            description: 'Lorem ipsum dolor sit amed.',
            thubmnail: 'video-thumbnail-2.jpg'
          }
        ]
      }
    }
    const store = createMockStore(state)

    const props = {
      videoDetail: state.videoDetail,
      trendings: state.trendings,
      history: {
        push: jest.fn()
      },
      match: {
        params: { id: 'lZoA5ZX4wC0' }
      },
      fetchVideoDetail: jest.fn(),
      fetchTrendings: jest.fn(),
      ...propOverrides
    }

    const nextProps = { match: { params: { id: 'lZoA5ZX4wC01' } } }

    const wrapper = shallow(<VideoDetailPage {...props} />)

    return {
      wrapper,
      props,
      nextProps,
      store,
      state
    }
  }

  it('renders properly', () => {
    const { wrapper } = setup()
    expect(wrapper).toMatchSnapshot()
  })

  describe('componentDidMount call', () => {
    it('calls fetchVideoDetail action when first page load', () => {
      const { wrapper, props } = setup({ videoDetail: { isFetching: true, video: {} } })
      const mockFetchData = jest.spyOn(VideoDetailPage.prototype, 'fetchData')

      wrapper.instance().componentDidMount()
      expect(wrapper).toMatchSnapshot()
      expect(mockFetchData).toHaveBeenCalledWith(props.match.params.id)
    })

    it('calls fetchVideoDetail action if video id is not equal to match params id', () => {
      const { wrapper, props } = setup()
      const mockFetchData = jest.spyOn(VideoDetailPage.prototype, 'fetchData')

      wrapper.instance().componentDidMount()
      expect(mockFetchData).toHaveBeenCalledWith(props.match.params.id)
    })
  })

  describe('componentWillReceiveProps call', () => {
    it('calls fetchVideoDetail when page doesn\'t changed.', () => {
      const { wrapper, props } = setup()
      const mockFetchData = jest.spyOn(VideoDetailPage.prototype, 'fetchData')

      wrapper.instance().componentWillReceiveProps(props)

      expect(wrapper).toMatchSnapshot()
      expect(mockFetchData.mock.calls).toHaveLength(1)
    })

    it('calls fetchVideoDetail when page changed.', () => {
      const { wrapper, nextProps } = setup()
      const mockFetchData = jest.spyOn(VideoDetailPage.prototype, 'fetchData')

      wrapper.instance().componentWillReceiveProps(nextProps)

      expect(wrapper).toMatchSnapshot()
      expect(mockFetchData.mock.calls).toHaveLength(2)
    })
  })

  it('returns videoDetail object when initialize component', () => {
    const { props } = setup()
    expect(mapStateToProps(props).videoDetail).toEqual(props.videoDetail)
  })

  it('checks loadData function', () => {
    const { store, props } = setup()
    expect(loadData(store, props.match)).toEqual(Promise.all([ store.dispatch(fetchVideoDetail(props.match.params.id)), store.dispatch(fetchTrendings()) ]))
  })
})
