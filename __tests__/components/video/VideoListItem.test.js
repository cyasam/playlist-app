import React from 'react'
import { shallow } from 'enzyme'
import VideoListItem from '../../../src/scripts/components/video/VideoListItem'
import { truncate } from 'fs';

describe('VideoListItem Component', () => {
  const setup = (propOverrides) => {
    const props = {
      video: {
        id: 'mh45igK4Esw',
        title: 'Elon Musk: How I Became The Real \'Iron Man\'',
        channelTitle: 'Bloomberg',
        statistics: {
          viewCount: '4277277',
          likeCount: '46304',
          dislikeCount: '4421',
          favoriteCount: '0',
          commentCount: '3524'
        },
        publishedAt: '2014-06-10T18:34:28.000Z',
        description: '"Bloomberg Risk Takers" profiles Elon Musk, the entrepreneur who helped create PayPal, built America\'s first viable fully electric car company, started the nation\'s biggest solar energy supplier,...',
        thumbnail: {
          url: 'https://i.ytimg.com/vi/mh45igK4Esw/hqdefault.jpg',
          width: 480,
          height: 360
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