import React from 'react'
import { shallow } from 'enzyme'
import VideoListItem from '../../../src/scripts/components/video/VideoListItem'
import { truncate } from 'fs';

describe('VideoListItem Component', () => {
  const setup = (propOverrides) => {
    const props = {
      video: {
        title: 'Video Title',
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur finibus dui libero, sit amet facilisis urna iaculis ac. Nulla vehicula magna pulvinar dolor placerat, eget consectetur purus porttitor. Nunc arcu quam, ornare sit amet ultrices ac, cursus pellentesque tortor.`,
        thumbnail: {
          url: 'https://i.ytimg.com/vi/b6hoBp7Hk-A/default.jpg',
          width: 120,
          height: 90
        }
      },
      ...propOverrides
    }

    const descStr = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur finibus dui l...'

    const wrapper = shallow(<VideoListItem video={props.video} />)
    return {
      wrapper,
      props,
      descStr
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
      expect(wrapper.find('ProgressiveImage').props().src).toEqual(props.video.thumbnail.url)
      expect(wrapper.find('ProgressiveImage').props().children().props.className).toEqual('card-img-top')
    })

    it('has title', () => {
      const { wrapper, props } = setup()
      expect(wrapper.find('.card-title').text()).toEqual(props.video.title)
    })
  })
})