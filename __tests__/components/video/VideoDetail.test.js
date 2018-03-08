import React from 'react'
import { shallow } from 'enzyme'
import VideoDetail from '../../../src/scripts/components/video/VideoDetail'

describe('VideoDetail Component', () => {
  const setup = (dataPropOverrides) => {
    const props = {
      data: {
        isFetching: false,
        error: null,
        video: {
          id: 'lZoA5ZX4wC0',
          title: 'Ocean Beach Surfing Raw | San…cisco, CA',
          channelTitle: 'Jeff Chavolla',
          statistics: {
            viewCount: '121659',
            likeCount: '450',
            dislikeCount: '47',
            favoriteCount: '0',
            commentCount: '100'
          },
          publishedAt: '2017-12-04T07:18:50.000Z',
          description: 'Raw surfing video clips of Ocean Beach in San Francisco'
        },
        ...dataPropOverrides
      }
    }
    const wrapper = shallow(<VideoDetail {...props} />)
    return {
      wrapper,
      props
    }
  }

  it('renders properly', () => {
    const { wrapper } = setup()
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find('.video-detail').exists()).toBe(true)
  })

  it('renders properly if any video is not found.', () => {
    const { wrapper } = setup({ video: {} })
    expect(wrapper).toMatchSnapshot()
  })

  it('renders Loading when isFetching is true', () => {
    const { wrapper } = setup({
      isFetching: true, video: {}
    })
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find('Loading').exists()).toBe(true)
  })

  it('renders error when error is defined', () => {
    const { wrapper } = setup({
      error: 'Error', video: {}
    })
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find('.error').exists()).toBe(true)
  })
})
