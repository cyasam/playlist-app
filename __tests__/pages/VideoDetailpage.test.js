import React from 'react'
import { shallow } from 'enzyme'
import { VideoDetailPage } from '../../src/scripts/pages/VideoDetailpage'

describe('Video Detail Page', () => {
  const setup = (propOverrides) => {
    const props = {
      history: {
        location: {
          search: '?v=yG-9XIIELk4'
        }
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
      ...propOverrides
    }

    const wrapper = shallow(<VideoDetailPage { ...props } />)
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
    const { wrapper, props } = setup({ videoDetail: { isFetching: true, video: {} } })

    wrapper.instance().componentDidMount()
    expect(wrapper).toMatchSnapshot()
    expect(props.fetchVideoDetail).toHaveBeenCalledWith('yG-9XIIELk4')
  })

  it('pushs history to Homepage action when video id is not defined in query string', () => {
    const { wrapper, props } = setup({ 
      history: {
        push: jest.fn(),
        location: {
          search: '?v='
        }
      },
      videoDetail: { isFetching: true, video: {} }
    })

    wrapper.instance().componentDidMount()
    expect(props.history.push).toHaveBeenCalled()
  })
})