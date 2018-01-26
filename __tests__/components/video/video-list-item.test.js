import React from 'react'
import { shallow } from 'enzyme'
import VideoListItem from '../../../src/scripts/components/video/video-list-item'

describe('VideoListItem Component', () => {
  const setup = (propOverrides) => {
    const props = {
      video: {
        title: 'Video Title',
        description: 'Lorem ipsum dolor sit amed.',
        thumbnail: {
          url: 'https://i.ytimg.com/vi/b6hoBp7Hk-A/default.jpg',
          width: 120,
          height: 90
        }
      },
      ...propOverrides
    }

    const wrapper = shallow(<VideoListItem video={props.video} />)
    return {
      wrapper,
      props
    }
  }

  it('renders properly', () => {
    const { wrapper } = setup()
    expect(wrapper).toMatchSnapshot()
  })

  it('has div with card class name', () => {
    const { wrapper } = setup()
    expect(wrapper.find('.card').exists()).toBe(true)
  })

  it('renders properly if video prop is also empty', () => {
    const { wrapper } = setup({ video: {} })
    expect(wrapper).toMatchSnapshot()
  })

  describe('Video Item', () => {
    it('has thumbnail', () => {
      const { wrapper, props } = setup()
      expect(wrapper.find('img').props().src).toEqual(props.video.thumbnail.url)
      expect(wrapper.find('img').props().width).toEqual(props.video.thumbnail.width)
      expect(wrapper.find('img').props().height).toEqual(props.video.thumbnail.height)
      expect(wrapper.find('img').props().alt).toEqual(props.video.title)
    })

    it('has title', () => {
      const { wrapper, props } = setup()
      expect(wrapper.find('.card-title').text()).toEqual(props.video.title)
    })

    it('has description', () => {
      const { wrapper, props } = setup()
      expect(wrapper.find('.card-text').text()).toEqual(props.video.description)
    })
  })
})