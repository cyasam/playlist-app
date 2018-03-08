import React from 'react'
import { shallow } from 'enzyme'
import { VideoDetailPage, mapStateToProps } from '../../src/scripts/pages/VideoDetailpage'

describe('Video Detail Page', () => {
  const setup = (propOverrides) => {
    const props = {
      history: {
        push: jest.fn()
      },
      match: {
        params: { id: 'ZoA5ZX4wC0' }
      },
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
      fetchVideoDetail: jest.fn(),
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
      },
      fetchTrendings: jest.fn(),
      ...propOverrides
    }

    const wrapper = shallow(<VideoDetailPage {...props} />)
    wrapper.instance().historyListener = jest.fn()

    return {
      wrapper,
      props
    }
  }

  it('renders properly', () => {
    const { wrapper } = setup()
    expect(wrapper).toMatchSnapshot()
  })

  it('calls fetchVideoDetail action when first page load', () => {
    const { wrapper } = setup({ videoDetail: { isFetching: true, video: {} } })

    wrapper.instance().componentDidMount()
    expect(wrapper).toMatchSnapshot()
  })

  it('returns videoDetail object when initialize component', () => {
    const { props } = setup()
    expect(mapStateToProps(props).videoDetail).toEqual(props.videoDetail)
  })
})
