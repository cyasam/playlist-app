import React from 'react'
import { shallow } from 'enzyme'
import VideoList from '../../../src/scripts/components/video/VideoList'

describe('VideoList Component', () => {
  const setup = (propOverrides) => {
    const props = {
        isFetching: false,
        error: null,
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
        ],
        nextPageToken: 'CAUQAA',
        loadMoreCallback: jest.fn(),
        ...propOverrides
    }
    const wrapper = shallow(<VideoList { ...props } />)
    return {
      wrapper,
      props
    }
  }

  it('renders properly', () => {
    const { wrapper } = setup()
    expect(wrapper).toMatchSnapshot()
  })

  it('renders properly if any video is not found.', () => {
    const { wrapper } = setup({ videos: [] })
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find('.no-result').exists()).toBe(true)
  })

  it('renders Loading when isFetching is true', () => {
    const { wrapper } = setup({
      isFetching: true, videos: []
    })
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find('Loading').exists()).toBe(true)
  })

  it('renders error when error is defined', () => {
    const { wrapper } = setup({
      error: 'Error', videos: []
    })
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find('.error').exists()).toBe(true)
  })

  it('creates two videos', () => {
    const { wrapper } = setup()
    expect(wrapper.find('VideoListItem').length).toBe(2)
  })

  it('does`nt return loadmore button if nextPageToken is undefined', () => {
    const { wrapper } = setup({ nextPageToken: undefined })
    expect(wrapper.find('.btn').exists()).toBe(false)
  })

  it('returns loadmore button', () => {
    const { wrapper } = setup()
    expect(wrapper.find('.btn').exists()).toBe(true)
  })
  
  describe('When clicking loadmore button', () => {
    it('calls loadMoreCallback', () => {
      const { wrapper, props } = setup()
      wrapper.find('.btn').simulate('click', {
        preventDefault: () => {}
      })
      expect(props.loadMoreCallback).toHaveBeenCalledWith(props.nextPageToken)
    })
  
    it('show Loading', () => {
      const { wrapper, props } = setup({
        isFetching: true
      })
      expect(wrapper.find('Loading').exists()).toBe(true)
    })
  
    it('renders error', () => {
      const { wrapper, props } = setup({
        error: 'Error'
      })
      expect(wrapper.find('.error').exists()).toBe(true)
    })
  })
})