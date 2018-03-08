import React from 'react'
import { shallow } from 'enzyme'
import VideoListItem from '../../../src/scripts/components/video/VideoListItem'

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

    const wrapper = shallow(<VideoListItem {...props} />)
    return {
      wrapper,
      props,
      descStr
    }
  }

  it('renders properly', () => {
    const { wrapper } = setup()
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find('.card').exists()).toBe(true)
  })

  it('renders properly if type props is media', () => {
    const { wrapper } = setup({ type: 'media' })
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find('.media').exists()).toBe(true)
  })

  it('renders properly if video prop is also empty', () => {
    const { wrapper } = setup({ video: {} })
    expect(wrapper).toMatchSnapshot()
  })

  describe('Video Item', () => {
    const { wrapper, props } = setup()

    it('has thumbnail', () => {
      expect(wrapper.find('ProgressiveImage').props().src).toEqual(props.video.thumbnail.url)
      expect(wrapper.find('ProgressiveImage').props().children().props.className.includes('card-img-top')).toBe(true)
    })

    it('has title', () => {
      expect(wrapper.find('.card-title').text()).toEqual(props.video.title)
    })
  })

  describe('Video Item with type props equal to media', () => {
    const { wrapper, props } = setup({ type: 'media' })

    it('has thumbnail', () => {
      expect(wrapper.find('ProgressiveImage').props().src).toEqual(props.video.thumbnail.url)
      expect(wrapper.find('ProgressiveImage').props().children().props.className.includes('media-img')).toBe(true)
    })

    it('has title', () => {
      expect(wrapper.find('.media-title').text()).toEqual(props.video.title)
    })
  })
})
