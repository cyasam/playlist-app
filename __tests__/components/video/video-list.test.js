import React from 'react'
import { shallow } from 'enzyme'
import VideoList from '../../../src/scripts/components/video/video-list'

describe('VideoList Component', () => {
  const setup = (propOverrides) => {
    const props = {
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
      ], ...propOverrides
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

  it('renders properly if videos prop is undefined', () => {
    const { wrapper } = setup({ videos: undefined })
    expect(wrapper).toMatchSnapshot()

    expect(wrapper.find('div').exists()).toBe(false)
  })

  it('renders properly if videos prop is empty', () => {
    const { wrapper } = setup({ videos: [] })
    expect(wrapper).toMatchSnapshot()

    expect(wrapper.find('div').text()).toEqual('No result')
  })

  it('creates two videos', () => {
    const { wrapper } = setup()
    expect(wrapper.find('VideoListItem').length).toBe(2)
  })
})